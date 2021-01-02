import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';

const firebaseConfig = {
  apiKey: "AIzaSyAAC4zZ2PyhJiV77585ZJ_arqQhkOnc40Y",
  authDomain: "ng-test-930a5.firebaseapp.com",
  databaseURL: "https://ng-test-930a5.firebaseio.com",
  projectId: "ng-test-930a5",
  storageBucket: "ng-test-930a5.appspot.com",
  messagingSenderId: "12354345260",
  appId: "1:12354345260:web:ed680e9c4bb5e8d9c87489"
};
// Initialize Firebase

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
