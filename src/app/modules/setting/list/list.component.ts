import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { COMMON_EXPORTS } from '../../../core/common-exports.constants';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CoreService } from '../../../core/services/core.services';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    COMMON_EXPORTS
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
onSubmit() {
throw new Error('Method not implemented.');
}

  @ViewChild('offerModal', { static: true}) offerModal!: TemplateRef<any>;
  dialogRef!: DialogRef;
  private dialog: Dialog = inject(Dialog);
  private coreService:CoreService = inject(CoreService);
  settingsList = [
    { id: 1, name: 'Notification', description: 'Manage notification preferences' },
    { id: 2, name: 'Privacy', description: 'Control privacy settings' },
    { id: 3, name: 'Language', description: 'Set your preferred language' },
  ];

  addSetting() {
    this.dialogRef = this.dialog.open(this.offerModal, {
      // backdropClass: 'card',
      // hasBackdrop: true,
      panelClass: 'card',
      height: '250px',
      width: '350px'
    });
  }

  editSetting(id: number) {
    console.log('Edit setting with ID:', id);
  }

  deleteSetting(id: number) {
    const confirmation = confirm('Are you sure you want to delete this setting?');
    if (confirmation) {
      this.settingsList = this.settingsList.filter((item) => item.id !== id);
      console.log('Deleted setting with ID:', id);
    }
  }
  Toast() {
    this.coreService.displayToast({
      type:'success',
      message: "Sneha"
    })
    setTimeout(() => {
      this.coreService.displayToast({
        type:'error',
        message: "Sneha"
      })
    }, 2000);
  }
}
