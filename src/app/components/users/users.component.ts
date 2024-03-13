import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from '../../shared/components/user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  userList: any;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getUserList().subscribe({
      next: (response: User) => {
        this.userList = response;
        // console.log(this.userList);
      },
      error: (error) => {
        console.error(error);
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
              console.log('User created...', response);
            },
            error: (error) => {
              console.error(error);
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
              console.log('User updated...', response);
            },
            error: (error) => {
              console.error(error);
            },
          });
        }
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      },
    );
  }

  handleDelete(userId: number) {
    console.log(userId);
  }
}
