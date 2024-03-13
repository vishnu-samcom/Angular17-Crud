import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../interfaces/user';
import { UserService } from '../../services';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
})
export class UserModalComponent implements OnInit {
  @Input() data: any;

  userForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.getUser(this.data.id);
    }
  }

  get formControl() {
    return this.userForm.controls;
  }

  getUser(userId: string) {
    this.userService.getSingleUser(userId).subscribe({
      next: (response: User) => {
        const { first_name, last_name, email, phone } = response;
        this.userForm.patchValue({ first_name, last_name, email, phone });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.activeModal.close(this.userForm.value);
    this.userForm.reset();
  }

  onCancel() {
    this.userForm.reset();
    this.activeModal.close('Cancel');
  }
}
