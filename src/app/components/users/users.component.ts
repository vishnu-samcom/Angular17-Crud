import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from '../../shared/components/user-modal/user-modal.component';
import { UserService, NotificationService } from '../../shared/services';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  userList: User[] = [];

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getUserList().subscribe({
      next: (response: any) => {
        this.userList = response;
        this.userList.reverse();
      },
      error: (error) => {
        console.error(error);
        this.notification.error(error.message);
      },
    });
  }

  handleCreate() {
    // Modal config options
    const modalRef = this.modalService.open(UserModalComponent, {
      backdrop: 'static',
      size: 'xl',
      centered: true,
      keyboard: false,
    });

    // Bind modal data
    modalRef.componentInstance.data = { title: '# Create User' };

    // Handle the modal result
    modalRef.result.then(
      (result) => {
        if (result && result !== 'Cancel') {
          this.userService.addUser(result).subscribe({
            next: (response: any) => {
              this.getAllUser();
              this.notification.success('User created successfully! :)');
            },
            error: (error) => {
              console.error(error);
              this.notification.error(error.message);
            },
          });
        }
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      },
    );
  }

  handleEdit(userId: string) {
    // Modal config options
    const modalRef = this.modalService.open(UserModalComponent, {
      backdrop: 'static',
      size: 'xl',
      centered: true,
      keyboard: false,
    });

    // Bind modal data
    modalRef.componentInstance.data = { id: userId, title: '# Update User' };

    // Handle the modal result
    modalRef.result.then(
      (result) => {
        if (result && result !== 'Cancel') {
          this.userService.updateUser(userId, result).subscribe({
            next: (response: any) => {
              this.getAllUser();
              this.notification.success('User updated successfully! :)');
            },
            error: (error) => {
              console.error(error);
              this.notification.error(error.message);
            },
          });
        }
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      },
    );
  }

  handleDelete(userId: string, name: string) {
    // Modal config options
    const modalRef = this.modalService.open(DeleteDialogComponent, {
      backdrop: 'static',
      centered: true,
      keyboard: false,
    });

    const deleteMessage = `Are you sure you want to delete ${name}?`;

    // Bind modal data
    modalRef.componentInstance.data = { title: '# Confirm Deletion', message: deleteMessage };

    // Handle the modal result
    modalRef.result.then(
      (result) => {
        if (result && result === 'Delete confirmed') {
          this.userService.deleteUser(userId).subscribe({
            next: (response: any) => {
              this.getAllUser();
              this.notification.success('User deleted successfully! :)');
            },
            error: (error) => {
              console.error(error);
              this.notification.error(error.message);
            },
          });
        }
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      },
    );
  }
}
