import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

// fcm => Firebase cloud message
Injectable()
export class FcmService {

    constructor (
        private firebase: Firebase,
        private afs: AngularFirestore,
        private platform: Platform) {}

    /*
     * With Platform you can check on what device your app is running. 
     * You can do device specific adjustments
     */
    async getToken() {
        let token;
        if (this.platform.is('android')) {
            token = await this.firebase.getToken();
        }
        if (this.platform.is('ios')) {
            token = await this.firebase.getToken();
            await this.firebase.grantPermission();
        }
        this.saveToken(token);
    }    

    /* 
     * Function that stores the token on Firebase
     * Collections consist of documents. In our case we have
     * a collection of devices where we are storing documents with
     * token and userId
     */ 
    private saveToken(token) {
        if (!token) return;
        
        const devicesRef = this.afs.collection('devices');
        
        const data = {
            token, // beause the key and the variable has the same name token: token
            userId: 'testUserId'
        };
        
        // .doc(token) its the path where to find de document (data). 
        // data is the value (document). Its like Key: value pairs. 
        return devicesRef.doc(token).set(data);
    }

    /*
     * To be able to receives notifications on our cellphone
     */
    onNotifications() {
        return this.firebase.onNotificationOpen();
    }
}
