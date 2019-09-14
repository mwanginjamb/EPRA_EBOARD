import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { AuthService} from '../auth.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.page.html',
  styleUrls: ['./annotations.page.scss'],
})
export class AnnotationsPage implements OnInit {
  data: any;
  fileid: any;
  annotations: any;
  identity: any;
  userannotations: any;
  annotation_data = {'document': '', 'username': ''};

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
     private authService: AuthService,
      private storage: Storage,
      private toastCtrl: ToastController,
      ) {
    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state) {
        this.fileid = this.router.getCurrentNavigation().extras.state.file;
      }
    });
    // get all annotations
    this.getAnnotations(this.fileid);
    this.getIdentity();
    this.annotation_data.document = this.fileid;
    this.annotation_data.username = this.identity;
    
   

  }

  ngOnInit() {
   

    
    

  }
 getAnnotations(fileTitle){
   this.authService.getannotation(fileTitle).subscribe((res) => {
     if(res){
       console.log(res.results);


       if(res.results){
         this.annotations = res.results;
        let size = Object.keys(res.results).length;
         console.log('Annotations.......................'+ size);
         if(!size){
           this.presentToast();
         }
       }

     }else{
      this.presentToast();
     }
   });

 }  

  getIdentity(){
    // use identity promise to extract username
    return this.storage.get('userData').then((val) => {
      this.identity = val.user.username;
     
    });
  }
  showUserAnnotations() {
    const annotation_access = {"user":this.identity,"file":this.fileid};
    const navigationExtras: NavigationExtras = {
      state: {
        annotations: annotation_access,
      }
    };
    return this.router.navigate(['my-annotations'], navigationExtras);
    
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Sorry, this document has no annotations.',
      duration: 5000,
      animated: true,
    });
    toast.present();
  }
 
}
