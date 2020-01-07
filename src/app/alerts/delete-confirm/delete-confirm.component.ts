import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {
  @Input() message: string;
  @Input() skipReason: boolean;
  deleteConfirm = new Subject<any>();
  deleteReason: string;

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  confirm() {
    const callback: any = {};
    if (!this.skipReason) {
      callback.reason = this.deleteReason;
    }
    callback.response = true;
    this.deleteConfirm.next(callback);
    this.bsModalRef.hide();
  }

  cancel() {
    const callback: any = {};
    callback.response = false;
    this.deleteConfirm.next(callback);
    this.bsModalRef.hide();
  }

}
