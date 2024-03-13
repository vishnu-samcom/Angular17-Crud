import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [],
  template: `
    <div class="modal-content">
      <div class="modal-header justify-content-between" style="padding: 0 10px 0 10px;">
        <h5 class="modal-title">{{ data?.title }}</h5>
        <button type="button" class="btn close float-right" aria-label="Close" (click)="activeModal.dismiss('Cancel')">
          <span aria-hidden="true" style="font-size: 30px;">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h5>{{ data?.message }}</h5>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss('Cancel')">No</button>
        <button type="button" class="btn btn-danger" (click)="confirmDelete()">Yes</button>
      </div>
    </div>
  `,
})
export class DeleteDialogComponent {
  @Input() data!: any;
  constructor(public activeModal: NgbActiveModal) {}

  confirmDelete() {
    this.activeModal.close('Delete confirmed');
  }
}
