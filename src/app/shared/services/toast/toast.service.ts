import {Injectable} from '@angular/core';
import {NgToastService} from "ng-angular-popup";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: NgToastService) {
  }

  openSuccess(message: string) {
    this.toast.success({
      detail: 'Success',
      summary: message,
      duration: 3000,
      position: 'topRight',
    });
  }

  openError(error: string) {
    this.toast.error({
      detail: 'Error',
      summary: error,
      duration: 3000,
      position: 'topRight',
    });
  }
}
