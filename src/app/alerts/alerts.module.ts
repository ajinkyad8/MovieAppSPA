import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { AlertComponent } from './alert/alert.component';
import { AlertModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [
    AlertComponent,
    DeleteConfirmComponent],
  imports: [
    SharedModule,
    AlertModule.forRoot(),
  ], exports : [
    AlertComponent,
  ],
  entryComponents: [
     DeleteConfirmComponent
  ],
})
export class AlertsModule { }
