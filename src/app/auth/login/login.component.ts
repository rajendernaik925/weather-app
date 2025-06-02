import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IApiResponse } from '../../core/modals/api-respones';
import { HttpErrorResponse } from '@angular/common/http';
import { CoreService } from '../../core/services/core.services';
import { ITokenData } from '../../core/modals/tokent';
import { IAdmin } from '../../core/modals/admin';
import { SettingsService } from '../../core/services/settings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {


  logo: string = 'images/SKILLOGO.png';
  @ViewChild('formRef') form!: ElementRef;

  totalInputs:number | null = null;
  textInputs: number | null = null;
  passwordInputs:number | null = null;
  checkboxInputs:number | null = null;
  countBoolean:boolean = false;

  private router: Router = inject(Router);
  private authService:AuthService = inject(AuthService);
  private coreService:CoreService = inject(CoreService);
  private settingsService: SettingsService = inject(SettingsService);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
     password:new FormControl('', [Validators.required, Validators.minLength(8)]),
     rememberMe:new FormControl(false),
  })

  ngAfterViewInit() {
    // this.countInputTypes();
  }

  countInputTypes() {
    this.countBoolean = true;
    if (!this.form) {
      console.error('Form reference is not available!');
      return;
    }

    const formElement = this.form.nativeElement;
    this.totalInputs = formElement.querySelectorAll('input').length;
    this.textInputs = formElement.querySelectorAll('input[type="text"]').length;
    this.passwordInputs = formElement.querySelectorAll('input[type="password"]').length;
    this.checkboxInputs = formElement.querySelectorAll('input[type="checkbox"]').length;

    console.log('Total Inputs:', this.totalInputs);
    console.log('Text Inputs:', this.textInputs);
    console.log('Password Inputs:',this. passwordInputs);
    console.log('Checkbox Inputs:', this.checkboxInputs);
  }
  sweetAlert() {
    Swal.fire({
      title: 'Enter your name',
      input: 'text',
      inputPlaceholder: 'Your name here',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('User input:', result.value);
      }
    });
  }

  Toast() {
    this,this.coreService.displayToast({
      type:'success',
      message:' Success Display Test Works'
    });
    setTimeout(() => {
      this.error()
    }, 2000);
  }
  error() {
    this,this.coreService.displayToast({
      type:'error',
      message:' Error Display Test Works'
    });
  }
  Reset() {
    this.loginForm.reset();
    this.coreService.displayToast({
      type:'success',
      message:'Successfully Reset Form Value'
    })
  }

  onSubmit(): void {
    console.log("Login value: ", this.loginForm.value);
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.Login(this.loginForm.value).subscribe({
        next: (res:IApiResponse) => {
          if(!res.settings.success) {
            this.coreService.displayToast({
              type:'error',
              message:res.settings.message
            })
          } else {
            const tokens: ITokenData = res.data;
            this.coreService.setTokens(tokens);
            this.fetchUserDetail();
          }

        },
        error: (err:HttpErrorResponse) => {
          this.coreService.displayToast({
            type:'error',
            message:err.message
          })
        }
      })
    } else {
      this.coreService.displayToast({
        type:"error",
        message:"credentials are not correct"
      })
    }
  }

  fetchUserDetail() {
    this.authService.fetchUserDetail().subscribe({
      next: (res: IApiResponse) => {
        if (!res.settings.success) {
          this.coreService.displayToast({
            type: 'error',
            message: res.settings.message,
          });
        } else {
          const adminData: IAdmin = res.data;
          this.settingsService.adminInfo.set(adminData);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.coreService.displayToast({
          type: 'error',
          message: err.message,
        });
      }
    })
  }

}
