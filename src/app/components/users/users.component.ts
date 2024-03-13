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

  handleEdit(userId: number) {
    const modalRef = this.modalService.open(UserModalComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal',
    });

    modalRef.componentInstance.data = { id: userId };

    // Handle the modal result
    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
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
