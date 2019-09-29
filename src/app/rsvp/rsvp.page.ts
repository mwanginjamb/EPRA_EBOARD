import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavParams, ModalController } from '@ionic/angular';



@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.page.html',
  styleUrls: ['./rsvp.page.scss'],
})
export class RsvpPage implements OnInit {

  RsvpModel = {'ProfileID': '', 'CalendarID': '', 'RSVPStatusID': ''};
  rsvpstatuses = { results : {}};

  // Get data passed into componentProps
  @Input() CalendarID: number;
   @Input() ProfileID  ;

  constructor(private service: AuthService, public navParams: NavParams, private  modalCtrl: ModalController ) {
    this.rsvpstatus();

    this.RsvpModel.ProfileID = navParams.get('ProfileID');
    this.RsvpModel.CalendarID = navParams.get('CalendarID');

    console.log(this.RsvpModel);
  }

  ngOnInit() {
  }

  // get rsvp status
  rsvpstatus() {
    return this.service.getRsvpstatus().subscribe(res => {
     this.rsvpstatuses.results = (res.results) ;
   });
 }

 // Process RSVP Response

 processRSVP() {
    console.log(this.RsvpModel);
    this.service. postRsvp(this.RsvpModel).subscribe((res) => {
      console.log(' results from post ' + JSON.stringify(res));
    });
}

OnCancel(){
    this.modalCtrl.dismiss();
}

}
