import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File} from '@ionic-native/file/ngx';


import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FormsModule } from '@angular/forms';
import { RsvpPage } from './rsvp/rsvp.page';




@NgModule({
  declarations: [
      AppComponent,
      RsvpPage,

  ],
  entryComponents: [
    RsvpPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      FileOpener,
      DocumentViewer,
      File,
    InAppBrowser,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
