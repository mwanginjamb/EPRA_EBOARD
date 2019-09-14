import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Platform} from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
    platformName: string;
  constructor(private navCtrl: NavController, public loadingCtrl: LoadingController, public platform: Platform) {
      this.loadingCtrl
          .create({ keyboardClose: true, message: 'Initializing...', spinner: 'dots'})
          .then(loadingEl => {
              loadingEl.present();
          });
      // get plaform name
      platform.ready().then((res) => {
          console.log('Platform is :' + res);
      });

      // detect ios
      if(this.platform.is('ipad')){
        console.log('You are running on ios');
        this.platformName = 'ipad';
      }
      // detect android
      if(this.platform.is('android')){
          console.log('You are running on ios');
          this.platformName = 'android';
      }

  }

  ngOnInit() {
    const time_out = 10000;


    setTimeout(() => {
        return this.loadingCtrl.dismiss();
    }, 8000);


    const hidesplash = setTimeout(() => {
      return this.navCtrl.navigateForward('/login');
    }, time_out);

    console.log('We are running on: ' + this.platformName);
  }

}
