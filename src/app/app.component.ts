import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  items = [];
  itemsSubscription: Subscription;
  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    const itemsCollection: AngularFirestoreCollection = this.afs.collection('Items');
    this.itemsSubscription = itemsCollection.snapshotChanges()
      .pipe(
        map((arr) => {
          return arr.map((snap) => {
            if (snap.payload.doc.data()) {
              return {
                ...snap.payload.doc.data(),
                id: snap.payload.doc.id,
                fromCache: snap.payload.doc.metadata.fromCache,
              };
            } else {
              return snap.payload.doc.data();
            }
          });
        })
      )
      .subscribe(items => {
        this.items = items;
        /// it emits twice when persistence enabled
        /// first one from cache the from server
        /// this counts as extra reads
        /// why it comes from server and counts as reads while there is no update to the database.
        console.log(items);
      })
  }

  addItem() {
    const title = 'Item: ' + this.getRandom();
    this.afs.collection('Items').add({ title })
  }

  getRandom() {
    return Math.round(Math.random() * (999999 - 9999) + 9999);
  }

  ngOnDestroy() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }
}
