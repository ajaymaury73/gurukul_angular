import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { College } from '../entity/college';
import { CommonPopupComponent } from '../common-popup/common-popup.component';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent {

   college:College=new College();
  
  constructor(private service: AdminService,private dialog: MatDialog, ){
  
  }
  ngOnInit(){
    this.getAllCollege();
  }
  
   
  
    openCollegePopUp(college:College){
      const dialogRef = this.dialog.open(CommonPopupComponent, {
             height: '80%',
             width: '100%',
            //  position: { top: '10%', left: '37%' },
             disableClose: true,
             data: {
               popupType: 'college',
               college: college ?? new College()
             }
           });
  
           dialogRef.afterClosed().subscribe(result => {
            if (result) {
              console.log("Dialog Result:", result.id);
              if (result.id) { 
                 this.updateCollege(result);
              } else {
                 this.addColleg(result);
              }
            }
          });
    }
  
 
  
   addColleg(colege: College): void {
     this.service.saveCollege(colege).subscribe({
       next: () => {
        //  this.showMessage("Category added successfully!", "success");
        //  this.getCategories();  // Refresh the category list
       },
       error: () => {
        //  console.error('Save Category Error:', error);
        //  this.showMessage("Failed to save category. Please try again!", "error");
       }
     });
   }

   updateCollege(college:College){

    this.service.updateCollege(college.id,college).subscribe({
             next: () => {
             this.getAllCollege();
             },
           error: () => {
               console.error('Update Category Error:');

            
             }
           });

   }
  
    colleges:College[]=[];
   getAllCollege(){
   this.service.getCollege().subscribe(data =>{
  this.colleges=data as College[];
   })
   }
  
  

   deleteCollege(id:string){
    console.log(id)
    this.service.deleteCollege(id).subscribe(data=>{
      this.getAllCollege();
    })
  }
}
