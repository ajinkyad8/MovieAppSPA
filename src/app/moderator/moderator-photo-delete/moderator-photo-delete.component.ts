import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModeratorService } from 'src/app/services/moderator.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-moderator-photo-delete',
  templateUrl: './moderator-photo-delete.component.html',
  styleUrls: ['./moderator-photo-delete.component.css']
})
export class ModeratorPhotoDeleteComponent implements OnInit {
  @Input() photosWithDeleteRequests: any;
  modalRef: BsModalRef;
  requests: any = [];
  currentIndex: number;

  constructor(private moderatorService: ModeratorService, private modalService: BsModalService, private alertService: AlertService) { }

  ngOnInit() {
  }

  viewRequests(id: number, requestModal: TemplateRef<any>, i) {
    this.moderatorService.getMoviePhotosDeleteRequests(id).subscribe(res => {
      this.requests = res;
      this.modalRef = this.modalService.show(requestModal, {class: 'modal-lg'});
      this.currentIndex = i;
    });
  }

  review(id, isApproved, i) {
    this.moderatorService.reviewPhotoDeleteRequest(id, isApproved).subscribe(() => {
      this.alertService.success('Successfully reviewed the request');
      if (isApproved) {
        this.photosWithDeleteRequests.splice(this.currentIndex, 1);
        this.modalRef.hide();
      } else {
        this.requests.splice(i, 1);
        if (this.requests.length === 0) {
          this.photosWithDeleteRequests.splice(this.currentIndex, 1);
          this.modalRef.hide();
        }
      }
    }, error => {
      this.alertService.danger(error);
    });
  }
}
