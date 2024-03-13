import { Component, inject, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
})
export class UserModalComponent implements OnInit {
  title = 'User Modal';
  @Input() data: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log('Modal Data : ', this.data.id);
  }
}
