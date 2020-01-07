import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../models/alert';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DeleteConfirmComponent } from '../alerts/delete-confirm/delete-confirm.component';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert: any = {};
  private alertSource = new Subject<Alert>();
  $alert = this.alertSource.asObservable();
  modal: BsModalRef;

constructor(private modalService: BsModalService) { }

confirmDelete(message: string, skipReason?: boolean): Promise<any> {
  const initialState = {message, skipReason};
  this.modal = this.modalService.show(DeleteConfirmComponent, {initialState});
  return new Promise<any>((resolve) =>  this.modal.content.deleteConfirm.subscribe(res => {
    resolve(res);
  }));
}

success(message: string) {
  this.alert.message = message;
  this.alert.type = 'success';
  this.alertSource.next(this.alert);
}
info(message: string) {
  this.alert.message = message;
  this.alert.type = 'info';
  this.alertSource.next(this.alert);
}
danger(message: string) {
  this.alert.message = message;
  this.alert.type = 'danger';
  this.alertSource.next(this.alert);
}
warning(message: string) {
  this.alert.message = message;
  this.alert.type = 'warning';
  this.alertSource.next(this.alert);
}
}
