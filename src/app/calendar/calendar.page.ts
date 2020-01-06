import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastController , ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RsvpPage } from '../rsvp/rsvp.page';




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  events: any;
  identity: any;
  rsvpstatuses = { results : {}};
  RsvpModel = {'ProfileID': '', 'CalenderID': '', 'RSVPStatusID': ''};
  constructor(
    private service: AuthService, 
    private toastCtrl: ToastController,
     public modalController: ModalController,
     private storage: Storage
     ) {
       // invoke methods on object initialization
    this.rsvpstatus();
    this.getIdentity();
    console.log('Profile id ni');
    console.log(this.identity);
   }
  ngOnInit() {
    this.loadEvents();
    console.log(this.rsvpstatuses);
  }

  loadEvents() {
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

  // User Identity-- asynchronous code here

    async getIdentity() {
    // use identity promise to extract username
    return await this.storage.get('userData').then((result) => {
      return this.identity = result.profile.id;
    });
  }

  // Toast Controller
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'There are no events on the calendar.',
      duration: 5000,
      animated: true,
    });
    toast.present();
  }
// Modal Controller for RSVP Response
  async presentModal(EventID) {
    // console.log(EventID);
    const modal = await this.modalController.create({
      component: RsvpPage,
      componentProps: {
        'CalendarID': EventID,
        'ProfileID': this.identity,
      }
    });
    return await modal.present();
  }


}
