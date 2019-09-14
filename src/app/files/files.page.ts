import { Component, OnInit } from '@angular/core';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { Storage } from '@ionic/storage';
import { AuthService } from '../auth.service';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';




@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage implements OnInit {

  files: any;
  baseUrl: string;
  fileid: any;
  id: any;
  params: any;

  constructor(private route: ActivatedRoute,
     private router: Router,
      private storage: Storage,
       private iab: InAppBrowser,
              private platform: Platform, 
              private document: DocumentViewer,
               private fileopener: FileOpener,
              private file: File,
               private ft: FileTransfer,
                private service: AuthService,
                 private navCtrl: NavController,
                 private toastCtrl: ToastController,
                 ) {
    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        console.log(this.router.getCurrentNavigation().extras.state.data); 
        this.fileid = this.router.getCurrentNavigation().extras.state.data;
      }
    });
    this.files = this.loadFiles(this.router.getCurrentNavigation().extras.state.data);
    this.getUser();
  }

  ngOnInit() {
    

  }

  loadFiles(folderId){
    console.log(folderId);
    this.service.getFiles(folderId).subscribe(res => {
      this.files = res.results;
      let count = this.files.length;

      if(!this.files.length){
        this.presentToast();
      }
      console.log('Available files................');
      console.log(this.files);
      console.log('array size: '+ count);
    });
  }



  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Sorry, you have no Files in this sub-folder.',
      duration: 5000,
      animated: true,
    });
    toast.present();
  }



  openDoc(title){
    /*this.storage.get('baseUrl').then(val => {
      this.baseUrl = val;
    });*/
    this.baseUrl = 'https://portal.erc.go.ke:8451/';

    let url = (this.baseUrl + 'documents/' + title);

  return this.iab.create('https://docs.google.com/viewer?url=' + url);



    /*if(this.platform.is('ios')){
      this.document.viewDocument(url,'application/pdf',{});
    } else {
      console.log('file url :' + url);
      this.fileopener.open(url,'application/pdf')
          .then(()=> console.log('File is open'))
          .catch(e => console.log('Error opening file', e));
          let path = this.file.dataDirectory;
          const transfer = this.ft.create();

          transfer.download(url, path + 'myfile.pdf').then(entry => {
            let url = entry.toURL();
            if (this.platform.is('ios')) {
              this.document.viewDocument(url, 'application/pdf', {});
            } else {
              this.fileopener.open(url, 'application/pdf')
                .then(() => console.log('File is opened'))
                .catch(e => console.log('Error opening file', e));
            }
          });
    }*/
  }
  convertSize(size){
    let mbsize = (size/(1024));
    let rounded = Math.round(mbsize * 10)/10;

    return rounded;
  }
  initializeItems(){
    return this.files;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    let data = this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      const result = data.filter((item) =>{
        return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
      console.log('Filtered...........................');
      this.files = result;
      console.log(this.files);
    }
    else{ // search field is empty return all documents in subfolder
      this.loadFiles(this.fileid);
      console.log('UnFiltered...........................');
      console.log(this.files);
    }
  }
  createAnnotation(title: string) {


       this.params = { title: title, user : this.id};

      console.log('title is: ' + this.params);
      const navigationExtras: NavigationExtras = {
          state: {
              user: this.params,
          }
      };
// Navigate to create annotation page
      //console.log('Navigation extras: ' + navigationExtras);
      return this.router.navigate(['create-annotation'], navigationExtras);
  }
  viewAnnotations(title: string) {
      const navigationExtras: NavigationExtras = {
          state: {
              file: title,
          }
      };
    // Navigate to create annotation page
      return this.router.navigate(['annotations'], navigationExtras);
  }
  getUser() {
    return this.id = this.service.identity;
    console.log('user identity....................');
    console.log(this.id);
  }
}
