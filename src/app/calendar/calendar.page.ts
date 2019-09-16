import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastController , AlertController } from '@ionic/angular';
import { resolve } from 'q';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  events: any;
  rsvpstatuses = { results : {}};
  constructor(private service: AuthService, private toastCtrl: ToastController) {
    this.rsvpstatus();
   }

  ngOnInit() {
    this.loadEvents();

    // console.log('rsvp status ni....');
    console.log(this.rsvpstatuses);
  }

  loadEvents(){
    return this.service.getCalendar().subscribe(res => {
      // console.log('events......'+ JSON.stringify(res.results));
      this.events = res.results;
      const size = Object.keys(res.results).length;
      if (!size) {
        this.presentToast();
      }
    });
  }

  // get rsvp status
  rsvpstatus() {
     return this.service.getRsvpstatus().subscribe(res => {
      this.rsvpstatuses.results = (res.results) ;
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
