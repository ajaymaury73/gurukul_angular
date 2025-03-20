import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { College } from '../entity/college';
import { Degree, DegreeType } from '../entity/degree';

@Component({
  selector: 'app-common-popup',
  templateUrl: './common-popup.component.html',
  styleUrls: ['./common-popup.component.css']
})
export class CommonPopupComponent {
  college: College = new College();
  logoImageBase64: string | null = null;

  degree: Degree[] = [new Degree()];
  degreeTypes = Object.values(DegreeType);
  message: string | null = null;
  isMessagePopup = false;

  constructor(
    public dialogRef: MatDialogRef<CommonPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data.college) {  
      this.college = { ...data.college };  
      this.logoImageBase64=this.college.collegeLogo;
    }

    if (data.message) {
      this.message = data.message;
      this.isMessagePopup = true;
    }
  }
  ngOnInit(){
   
  }

  closeDialog() {
    this.dialogRef.close();
  }

  resetForm() {
    this.college = new College();
    this.logoImageBase64 = null;
  }

  saveCollege() {
    if (!this.college) {
      console.error("College object is undefined");
      return;
    }
  
    this.college.collegeLogo = this.logoImageBase64 || ''; // Provide a fallback empty string if null
  
    this.dialogRef.close(this.college);
  }
  

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoImageBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage() {
    this.logoImageBase64 = null;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}