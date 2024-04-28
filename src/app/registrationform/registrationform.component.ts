import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.scss'],
})
export class RegistrationformComponent implements OnInit {
  @Output() interestsChanged = new EventEmitter<string[]>();
  newInterest: string = '';
  interests: string[] = [];
  registrationForm!: FormGroup;
  submitted: boolean = false;
  userData: any;
  states: string[] = ['Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu'];
  countries: string[] = ['USA', 'Canada', 'UK', 'Australia', 'India'];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  profilePhoto: string | undefined;
  photoPreview: string | undefined;
  sharedValue: string | undefined;
  imageValid: boolean = true;

  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserServiceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      profilePhoto: [''],
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]{1,20}$')],
      ],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      age: [20, ''],
      interests: [''],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      addressType: ['', Validators.required],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      newsLetter: [''],
    });

    this.userData = history.state.userData;
    if (this.userData) {
      this.registrationForm.patchValue({
        photoUrl: this.userData.photoUrl,
        photoPreview: this.userData.photoPreview,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        email: this.userData.email,
        mobile: this.userData.mobile,
        age: this.userData.age,
        country: this.userData.country,
        state: this.userData.state,
        addressType: this.userData.addressType,
        address1: this.userData.address1,
        address2: this.userData.address2,
        companyAddress1: this.userData.companyAddress1,
        companyAddress2: this.userData.companyAddress2,
      });

      if (this.userData.interests) {
        this.interests = this.userData.interests;
      }
      if (history.state.editProfile) {
        this.photoPreview = history.state.previousPhotoPreview;
      } else {
        this.photoPreview = history.state.photoPreview;
      }
    }
  }

  addInterest() {
    if (
      this.newInterest.trim() !== '' &&
      !this.interests.includes(this.newInterest.trim())
    ) {
      this.interests.push(this.newInterest.trim());
      this.registrationForm.patchValue({ interests: this.interests.join(',') });
      this.newInterest = '';
    }
  }
  removeInterest(interest: string) {
    const index = this.interests.indexOf(interest);
    if (index !== -1) {
      this.interests.splice(index, 1);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    const profileImageUrl = event.target.result;
    console.log(profileImageUrl);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width < 310 && height < 325) {
          this.imageValid = true;
          this.photoPreview = reader.result as string;
        } else {
          this.imageValid = false;
        }
      };
    };

    reader.readAsDataURL(file);
  }
  toggleAddressFields() {
    const addressType = this.registrationForm.get('addressType')?.value;
    if (addressType === 'Home') {
      this.registrationForm.get('companyAddress1')?.reset();
      this.registrationForm.get('companyAddress2')?.reset();
    } else if (addressType === 'Company') {
      this.registrationForm.get('address1')?.reset();
      this.registrationForm.get('address2')?.reset();
    }
  }

  submitForm() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      const formData = {
        ...this.registrationForm.value,
        interests: this.interests,

        photoPreview: this.photoPreview,
      };
      this.userService.createUser(formData).subscribe((newUser) => {
        this.router.navigate(['/profile', newUser.id], {
          state: { photoPreview: this.photoPreview },
        });
      });

      this.registrationForm.reset();
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  onEnterPressed(event: any) {
    event.preventDefault();
    if (this.newInterest.trim() !== '') {
      this.addInterest();
    }
  }
}
