import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  users: any = [];
  bsModalRef: BsModalRef;
  user: any;
  roles: any = [
    {name: 'Admin', value: 'Admin'},
    {name: 'Moderator', value: 'Moderator'},
    {name: 'User', value: 'User'}
  ];
  rolesToAdd: any = [];
  userRoles: any = [];

  constructor(private admin: AdminService, private bsModalService: BsModalService, private alertService: AlertService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.admin.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  openModal(user, template: TemplateRef<any>) {
    this.user = user;
    let i;
    let j;
    for (i = 0; i < this.roles.length; i++) {
      let isMatch = false;
      for (j = 0; j < this.user.userRoles.length; j++) {
        if (this.roles[i].name === this.user.userRoles[j].role.name) {
          isMatch = true;
          this.roles[i].checked = true;
          break;
        }
      }
      if (!isMatch) {
        this.roles[i].checked = false;
      }
    }
    this.bsModalRef = this.bsModalService.show(template);

  }

  updateRoles() {
    const rolesToUpdate = {roles: [...this.roles.filter(el => el.checked === true).map(el => el.name)]};
    this.admin.updateUserRoles(this.user, rolesToUpdate).subscribe(() => {
      rolesToUpdate.roles.forEach(el => {
        const userRole: any = {};
        const role: any = {};
        role.name = el;
        userRole.role = role;
        this.userRoles.push(userRole);
      });
      this.user.userRoles = this.userRoles;
  }, error => {
    this.alertService.danger(error);
  });
    this.bsModalRef.hide();
  }

}
