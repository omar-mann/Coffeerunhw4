
(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  const firebaseConfig = {
    apiKey: "AIzaSyDmMgXlNG3KYRkPAFKgUGtt66D9DoWC0-8",
    authDomain: "coffee-c46cf.firebaseapp.com",
    projectId: "coffee-c46cf",
    storageBucket: "coffee-c46cf.appspot.com",
    messagingSenderId: "265692239582",
    appId: "1:265692239582:web:0e3f75a10693c8c8dbd44f",
    measurementId: "G-PCME7778LK"
  };

  class FireBaseDataStore {
      constructor() {
          console.log('running the FireBaseDataStore function');
            firebase.initializeApp(firebaseConfig);
        // firebase.initializeApp(App.FirebaseConfig.firebaseConfig);
        this.firestore = firebase.firestore();
      }

      async add(key, val) {
          console.log('firebase add  ')
          const docRef = this.firestore.doc(`orders/${this.makeDocHash(20)}`);
          return docRef.set(val); // i realize that could just use .add, but wanted to try .set instead.
        // return this.firestore.doc(`orders/${key}`).set(val);
      }
      async get(email, cb)  { 
          const docRef = this.firestore.collection(`orders`);
          const snapshot = await docRef.where('emailAddress', '==', email).get();
          return await snapshot.docs.map(e => e.data());
      }
      async getAll(cb)    { 
          const docRef = this.firestore.collection(`orders`);
          const snapshot = await docRef.get();
          return await snapshot.docs.map(e => e.data());
      }
      async remove(email)   { 
          const docRef = await this.firestore.collection(`orders`);
          const batch = this.firestore.batch();
          const snapshot = await docRef.where('emailAddress', '==', email).get();
          snapshot.forEach(doc => {
              batch.delete(doc.ref);
          });
          await batch.commit();
      }
      makeDocHash(len) {
          var result           = '';
          var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for ( var i = 0; i < len; i++ ) {
             result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
       }
  }
  App.FireBaseDataStore = FireBaseDataStore;
  window.App = App;

})(window);