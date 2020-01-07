import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alert: Alert;
  isOpen: boolean;
  ngOnInit() {
    this.alertService.$alert.subscribe(data => {
      this.isOpen = true;
      this.alert = data;
    });
  }

  constructor(private alertService: AlertService) {
  }

}
