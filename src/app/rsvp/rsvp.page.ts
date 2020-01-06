import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavParams, ModalController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.page.html',
  styleUrls: ['./rsvp.page.scss'],
})
export class RsvpPage implements OnInit {

  RsvpModel = {'ProfileID': '', 'CalendarID': '', 'RSVPStatusID': ''};
  rsvpstatuses: any;

  // Get data passed into componentProps
  @Input() CalendarID: number;
  @Input() ProfileID  ;

  constructor(
    private service: AuthService,
    public navParams: NavParams,
    private  modalCtrl: ModalController,
    public toastCtrl: ToastController ) {
    this.RsvpModel.ProfileID = navParams.get('ProfileID');
    this.RsvpModel.CalendarID = navParams.get('CalendarID');

    
  }

  ngOnInit() {
    this.rsvpstatus();
    console.log(this.RsvpModel);
  }

  // get rsvp status
  rsvpstatus() {
    return this.service.getRsvpstatus().subscribe(res => {
     this.rsvpstatuses = (res.results) ;
   });
 }

 // Process RSVP Response

 processRSVP() {
    console.log(this.RsvpModel);
    this.service.postRsvp(this.RsvpModel).subscribe((res) => {
      // console.log(' results from post ' + JSON.stringify(res));
      if (res.results.status) {
        this.presentToast();
      }
    });
}

OnCancel() {
    this.modalCtrl.dismiss();
}

async presentToast() {
  const toast = await this.toastCtrl.create({
    message: 'Event Response Posted Successfully.',
    duration: 5000,
    animated: true,
  });
  toast.present();
}

}
