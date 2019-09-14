import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { catchError, map , tap } from 'rxjs/operators';
import { observable} from 'rxjs';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, LoadingController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData = {"username":"","password":""};
  results: any;
  status: any;
  authData: any;
  isLoading: any;




  ngOnInit(): void {
     let  current_stat = this.authService.getauthStatus();
      console.log(current_stat);
  }
  constructor(public authService: AuthService, public navCtrl: NavController, public loadingCtrl: LoadingController,
              public storage: Storage, private toastCtrl: ToastController) {

  }
  home() {
      return this.navCtrl.navigateForward('/home');
  }
  loginAgain() {
      return this.navCtrl.navigateBack('/login');
  }


  async presentToast(msg = 'Sorry, wrong username / password combination.') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000,
      animated: true,
    });
    toast.present();
  }

  authenticate(){
      console.log('we are here');
      if(!this.loginData.username.length || !this.loginData.password){
        this.loginAgain();
        }

      this.isLoading = true;
      this.loadingCtrl
          .create({ keyboardClose: true, message: 'Authenticating you...'})
          .then(loadingEl => {
              loadingEl.present();
          });

          
      this.authService.authenticate(this.loginData.username,this.loginData.password).subscribe((res)=>{
          if(res){
              console.log(res.results);
              this.storage.set('userData',res.results);
              this.authService.saveIdentity(res.results);
              if(res.results.status === 'authenticated'){
                  this.loadingCtrl.dismiss();
                  this.home();
          }else{
                  this.loadingCtrl.dismiss();
                  this.presentToast();
                  this.loginAgain();
              }

          }else{
              this.loadingCtrl.dismiss();
              this.presentToast();
              this.loginAgain();
          }
      });
  }





}
