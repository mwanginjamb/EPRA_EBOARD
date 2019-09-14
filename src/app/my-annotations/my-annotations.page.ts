import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { ToastController , AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-my-annotations',
  templateUrl: './my-annotations.page.html',
  styleUrls: ['./my-annotations.page.scss'],
})
export class MyAnnotationsPage implements OnInit {
  user_annotations: any;
  access: any;
  
  constructor(private router: Router,
     private route: ActivatedRoute,
      private toastCtrl: ToastController,
       private service: AuthService,
        private alertCtrl: AlertController,
       ) {
    this.route.queryParams.subscribe((params) => {
      if(this.router.getCurrentNavigation().extras.state){
        this.access = this.router.getCurrentNavigation().extras.state.annotations;
      }
    });

    console.log('Access credentials are :..' + JSON.stringify(this.access));
    this.getMyannotations(this.access.file,this.access.user);
    
  }

  ngOnInit() {
    console.log('----------User annotations----------------');
    console.log(this.user_annotations);
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Sorry, you have no annotations.',
      duration: 5000,
      animated: true,
    });
    toast.present();
  }
  deleteAnnotation(aid){
    console.log('Annotation id is :' + aid);
    this.service.deleteannotation(aid).subscribe((res) => {
      console.log(' results from del. op. ' + JSON.stringify(res));
      // if successful
      if (res.results.deleted) {
        this.showAlert(res.results.note);
        return this.router.navigate(['my-annotations']);
      } else { // not successfull
        this.showAlert(res.results);
        return this.router.navigate(['my-annotations']);
      }
    });
  }


  //Alertcomponent

  // Alert helper method
  private async showAlert(message){
    const customAlert = await this.alertCtrl.create({
      header : 'Annotation Status',
      message : message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },

      ],
    });
    return customAlert.present();
  }

  getMyannotations(fileTitle, username) {
    console.log('file is: ' + fileTitle + 'User is: ' + username);
    
    return this.service.getuserannotations(fileTitle, username).subscribe((res) => {
      if (res) {

        let size = Object.keys(res.results).length;
        console.log('user annotations.....'+ size);
        console.log(res.results);
      
        this.user_annotations = res.results;

        if(!size){
          this.presentToast();
        }

      }
    });

  }


}
