import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastController , AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  events: any;
  constructor(private service: AuthService, private toastCtrl: ToastController,) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents(){
    return this.service.getCalendar().subscribe(res => {
      console.log('events......'+ JSON.stringify(res.results));
      this.events = res.results;
      let size = Object.keys(res.results).length;
      if(!size){
        this.presentToast();
      }
    });
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'There are no events on the calendar.',
      duration: 5000,
      animated: true,
    });
    toast.present();
  }


}
