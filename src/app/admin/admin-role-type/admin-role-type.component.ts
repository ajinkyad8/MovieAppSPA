import { Component, OnInit, TemplateRef } from '@angular/core';
import { RoleTypeService } from 'src/app/services/roleType.service';
import { RoleType } from 'src/app/models/roleType';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-admin-role-type',
  templateUrl: './admin-role-type.component.html',
  styleUrls: ['./admin-role-type.component.css']
})
export class AdminRoleTypeComponent implements OnInit {
  roleTypes: RoleType[];
  role: any;
  bsModalRef: BsModalRef;
  title: string;

  constructor(private roleTypeService: RoleTypeService, private bsModalService: BsModalService, private alertService: AlertService) { }

  ngOnInit() {
    this.roleTypeService.getRoleTypes().subscribe(res => {
      this.roleTypes = res;
    });
  }

  editRoleType(role, template: TemplateRef<any>) {
    this.title = 'Edit ' + role.roleName;
    this.role = role;
    this.bsModalRef = this.bsModalService.show(template);
  }

  addRoleType(template: TemplateRef<any>) {
    this.title = 'Add';
    this.role = {};
    this.bsModalRef = this.bsModalService.show(template);
  }

  save() {
    if (this.role.id) {
      this.roleTypeService.editRoleType(this.role).subscribe(() => {
        this.alertService.success('Successfully update role type.');
      }, error => {
        this.alertService.danger(error);
      });
    } else {
      this.roleTypeService.createRoleType(this.role).subscribe((res: RoleType) => {
        this.roleTypes.push(res);
        this.alertService.success('Successfully added role type');
      }, error => {
        this.alertService.danger(error);
      });
    }
    this.bsModalRef.hide();
  }

  deleteRole(role) {
    this.alertService.confirmDelete('Are you sure you want to delete this role? It will delete all the movie roles of this role type?',
    true).then(res => {
      if (res.response) {
        this.roleTypeService.deleteRoleType(role.id).subscribe(() => {
          this.alertService.success('Successfully deleted the role type.');
          this.roleTypes.splice(this.roleTypes.indexOf(role) , 1);
        }, error => {
          this.alertService.danger(error);
        });
      }
    });
  }

}
