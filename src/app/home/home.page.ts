import {Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams, LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  authStatus: any;
  private authinfo:any;
  public folders: any;
  public data: any;
  results: any;


  ngOnInit() {
    console.log('welcome home..');

     this.authService.getIdentity();

  }
  ionViewWillEnter(){
      this.getfolders();
  }

  constructor(
      public storage: Storage,
      public authService: AuthService,
      private router: Router,
      private toastCtrl: ToastController
  ) {
    this.authStatus = this.getStatus();


  }

  public getStatus(){
    return this.storage.get('userData')
        .then((res) =>{
          if(res){
            this.authStatus =  res.status;
          }else{
            this.authStatus = 'Login to Proceed';
          }
        } );
  }
    public getfolders() {

        return this.storage.get('userData').then((val) =>{
            console.log(val.profile.parent_folder_access);

            this.authService.getfolders(val.profile.parent_folder_access).subscribe(res =>{
                if(res){
                    console.log(res.results);
                    this.folders = res.results;
                    let size = Object.keys(res.results).length;
                    if(!size){
                      this.presentToast();
                    }
                }

            });
        });

    }

    showSub(params) {
      // console.log(params); return true;
        const navigationExtras: NavigationExtras = {
            state: {
                data: params
            }
        };
        return this.router.navigate(['subfolders'], navigationExtras);
    }


  logout() {
    return this.authService.clearIdentity();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Sorry, no folders created yet.',
      duration: 5000,
      animated: true,
    });
    toast.present();
  }
}
