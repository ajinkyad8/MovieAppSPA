import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AdminService } from '../services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
