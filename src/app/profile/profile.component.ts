import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any = {};

  photoPreview: string | undefined;
  interests: string[] = [];
  registrationForm!: FormGroup;
  userData: any;

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.userService.getUserData(userId).subscribe((userData) => {
        this.user = userData;
      });
    });

    this.photoPreview = history.state.photoPreview;
  }

  fetchPhotoPreview(photoUrl: string) {
    this.photoPreview = photoUrl;
  }

  editPhoto() {
    this.router.navigate(['/registeration-form'], {
      state: { userData: this.user, photoPreview: this.photoPreview },
    });
  }

  editProfile() {
    this.router.navigate(['/registeration-form'], {
      state: { userData: this.user, photoPreview: this.photoPreview },
    });
  }
  agree() {
    this.router.navigate(['/home']);
  }
}


