// modal.component.ts
import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title: string = 'Modal';
  @Input() variant: 'primary' | 'success' | 'danger' | 'logout' = 'primary';
  @Input() onSubmit?: () => void;

  @ViewChild('content') modalContent!: any;
  private modalRef?: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  open() {
    this.modalRef = this.modalService.open(this.modalContent, {
      centered: true,
    });
  }

  close() {
    this.modalRef?.close();
  }

  saveChanges() {
    if (this.onSubmit) {
      this.onSubmit();
    }
    this.close();
  }

  getCloseButtonImage(): string {
    switch (this.variant) {
      case 'primary':
        return '../../../../assets/images/primary-icon.svg';
      case 'logout':
        return '../../../../assets/images/logout.svg';
      case 'danger':
        return '../../../../assets/images/trash-icon.svg';
      case 'success':
        return '../../../../assets/images/success-icon.svg';
      default:
        return '../../../../assets/images/primary-icon.svg';
    }
  }

  getBtnClass(): string {
    switch (this.variant) {
      case 'primary':
        return 'btn-primary';
      case 'logout':
        return 'btn-warning';
      case 'danger':
        return 'btn-danger';
      case 'success':
        return 'btn-success';
      default:
        return 'btn-primary';
    }
  }
}
