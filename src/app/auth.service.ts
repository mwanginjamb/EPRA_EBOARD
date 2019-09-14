import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map , tap } from 'rxjs/operators';
import { observable} from 'rxjs';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root',
})

export class AuthService {

  // baseUrl = 'http://192.168.0.188:81/'; //local dev 'http://localhost:82/'
  baseUrl = 'https://portal.erc.go.ke:8451/';
  results: string;
  identity: any;
  status: any;


  constructor(public http: HttpClient,public storage: Storage, public navCtrl: NavController) {
    console.log('Hello AuthServiceProvider Provider');
    this.storage.set('baseUrl',this.baseUrl);
    this.getIdentity();
  }
  postData(credentials, type){
    return new Promise((resolve, reject)=>{

      this.http.post<{results: {} }>(this.baseUrl+type,JSON.stringify(credentials))
          .subscribe(res =>{
            resolve(res);
            console.log(resolve(res));
          },(err)=>{
            reject(err);
          })
    });
  }

  authenticate(username,password) {
    console.log('authenticating');
      let url = this.baseUrl + 'site/mobauth?username=' + username + '&password=' + password;
      return this.http.get< {results: {status: any} }>(url);
  }
   postannotation(annotation){
       let url = this.baseUrl + 'site/addannotation?doc_title='+ annotation.doc_title+'&annotation='+ annotation.annotation+'&creator='+ annotation.creator+'&email='+ annotation.email+'&designation='+ annotation.designation;
       return this.http.get< {results: {status: any} }>(url);
   }
    getfolders(access) {
        console.log('getting folders:' + access);
        const url = this.baseUrl + 'site/folders?access=' + access;
        // @ts-ignore
        return this.http.get < {results: {} }>(url);
    }
    getsubfolders(folderId){
      const action = this.baseUrl + '/site/subfolders?fid=' + folderId;
      return this.http.get< {results: {} }>(action);
    }
    getFiles(subfolderId){
        const action = this.baseUrl + '/site/files?sid=' + subfolderId;
        return this.http.get< {results: {} }>(action);
    }
    getCalendar(){
      const action = this.baseUrl + '/site/events';
      return this.http.get<{ results:{} }>(action);
    }
  saveIdentity(identity){
      this.identity = identity;
      this.storage.set('identity',identity);
  }
  getIdentity() { // returns a promise always
    console.log('get identity here');
      return this.storage.get('userData')
          .then((res) =>{
              if (res) {
                 // console.log(res);
                  this.identity = res;
              } else {
                  console.log('Ooh shoot, not a real user!!!');
              }
          } );
  }
  public clearIdentity(){
    return this.storage.clear()
        .then(()=>{
          console.log('Identity Cleared.');
          this.navCtrl.navigateBack('/login');
        });
  }

  public async removeIdentity(Idkey){
    return await this.storage.remove(Idkey);
  }
    public getauthStatus(){
        return this.storage.get('userData')
            .then((res) =>{
                if (res) {
                     this.status = res.status;
                     console.log('Current status: ' + this.status);
                } else {
                    this.status = 'Login to Proceed';
                }
            } );
    }
    getannotation(filetitle){
        const action = this.baseUrl + 'site/listannotations?docTitle=' + filetitle;
        return this.http.get< {results: {} }>(action);
    }
    getuserannotations(filetitle, username) {
        const action = this.baseUrl + 'site/userannotations?docTitle=' + filetitle + '&username=' + username;
        return this.http.get< {results: {} }>(action);
    }
    deleteannotation(aid) {
        const action = this.baseUrl + 'site/deleteannotation?id=' + aid;
        return this.http.get< {results: {
                note: string;
                deleted: any;
            } } >(action);
    }
}
