import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-create-annotation',
  templateUrl: './create-annotation.page.html',
  styleUrls: ['./create-annotation.page.scss'],
})
export class CreateAnnotationPage implements OnInit {
  data: any;
  documentTitle: any;
  username: any;
  email: any;
  designation: any;


  annotation = {"doc_title":"","annotation":"","creator":"","email":"","designation":""};
  constructor(private route: ActivatedRoute,
              private router: Router, private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              public http: HttpClient,
              public authService: AuthService) {
    this.route.queryParams.subscribe(params => {
      console.log(JSON.stringify(this.router.getCurrentNavigation().extras.state.user));
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
      } else{
        console.log('No params passed');
      }
      this.documentTitle = this.data.title;
      this.username = this.data.user.user.username;
      this.email = this.data.user.user.email;
      this.designation = this.data.user.profile.designation;

      //load the anotation object partially
      this.annotation.doc_title = this.documentTitle;
      this.annotation.creator = this.username;
      this.annotation.email = this.email;
      this.annotation.designation = this.designation;
    });
  }

  ngOnInit() {
    console.log('Data state on init........');
    console.log(JSON.stringify(this.data));
  }
  postAnnotation(){
    //console.log(JSON.stringify(this.annotation));
    const loading = this.loadingCtrl
        .create({ keyboardClose: true, message: 'Posting Document Annotation'})
        .then(loadingEl => {
          loadingEl.present();
        });

    this.authService. postannotation(this.annotation).subscribe((res) => {
      console.log(' results from post ' + JSON.stringify(res));
      if(res){
        if(res.results) {
          this.loadingCtrl.dismiss();
          this.showAlert('Document annotation, successfully saved');
          this.navCtrl.pop();
        }else{
          this.loadingCtrl.dismiss();
          this.showAlert('Problem saving document annotation, try later.');
          this.navCtrl.pop();
        }

      } else {
        this.loadingCtrl.dismiss();
        this.showAlert('Problem saving document annotation, try later.');
        this.navCtrl.pop();
      }
    });


    /* let url = 'http://localhost:81/site/addannotation?doc_title='+this.annotation.doc_title+'&annotation='+ this.annotation.annotation+'&creator='+this.annotation.creator+'&email='+this.annotation.email+'&designation='+this.annotation.designation;

     this.http.get(url)
         .map(res => res.json())
         .subscribe(data => {
           console.log(JSON.stringify(data.results));
           if(data.results === 1){
             this.loadingCtrl.dismiss();
             //show dialog on success
             this.showAlert('Document annotation, successfully saved');
             //go back to previous view
             this.navCtrl.pop();
           }else{
             this.loadingCtrl.dismiss();
             //show dialog for failure
             this.showAlert('Problem saving document annotation, try later.');
             //go back to previous failure
             this.navCtrl.pop();

           }

         }, error => {
           console.log('Error : '+error);
         });*/
  }

  //Alert helper method
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

}
