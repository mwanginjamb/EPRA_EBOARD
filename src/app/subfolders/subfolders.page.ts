import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-subfolders',
  templateUrl: './subfolders.page.html',
  styleUrls: ['./subfolders.page.scss'],
})
export class SubfoldersPage implements OnInit {

  data: any;
  subfolders: any;
  subfolderId: number;
  files: any;
   subfoldercount: number;
   masub: any;
  //results: any;

  constructor(

      private route: ActivatedRoute,
      private router: Router,
      private service: AuthService,
      private toastCtrl: ToastController
      

      ) {
      this.route.queryParams.subscribe(params => {
          if(this.router.getCurrentNavigation().extras.state){
              this.data = this.router.getCurrentNavigation().extras.state.data;
          }
      });

      console.log(this.router.getCurrentNavigation().extras.state.data.id);
      this.masub = this.loadSubfolders(this.router.getCurrentNavigation().extras.state.data.id);

      
  }

  ngOnInit() {
   
  }
  loadSubfolders(folderid){
      console.log('folder id :'+ folderid);
    return this.service.getsubfolders(folderid).subscribe(res => {
      console.log('subfolders......'+ JSON.stringify(res.results));
      this.subfolders = res.results;
      this.subfoldercount = this.subfolders.length;
      let size = Object.keys(res.results).length;
      if(!size){
        this.presentToast();
      }

      console.log('You have '+this.subfolders.length+' Subfolders in this folder.');
    });
  }
  showFiles(subfolder){
  console.log('subfolder : ...'+ JSON.stringify(subfolder)); 
  this.subfolderId = subfolder.id;

  console.log('Subfolder id :'+ this.subfolderId); 
      const navigationExtras: NavigationExtras = {
          state: {
                data: this.subfolderId,
          }
      };
    // Navigate to Files page
      return this.router.navigate(['files'], navigationExtras);


  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Sorry, you have no sub-folders in this folder.',
      duration: 5000,
      animated: true,
    });
    toast.present();
  }

}
