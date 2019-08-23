import { NotificationMessage } from './notification-message';
import { Injectable } from "@angular/core";
import { request } from "tns-core-modules/http";

@Injectable()
export class NotificationService {

    // tslint:disable-next-line:variable-name
    readonly BaseURI: string;
    readonly secretKey: string;
    readonly appSettings = require("tns-core-modules/application-settings");

    constructor() {
        this.BaseURI = "https://fcm.googleapis.com/fcm/send";
        this.secretKey = "AIzaSyCcrHpEeVN4bHY_zSaZGotwnbfDyugd0Ak";
    }

    sendNotification(message : NotificationMessage) { 
        request({
          url:  this.BaseURI,
          method: "POST",
          headers: { 
            "Content-Type": "application/json" ,
            "Authorization" : "key="+this.secretKey
          },
          content: JSON.stringify({
              to: message.to,
              collapse_key: message.collapse_key,
              notification: {
                body: message.notification.body,
                title: message.notification.title
              }
          })
      }).then(
      (response) => {
          const result = response.content.toJSON();
          console.log(result);
      }, 
      (e) => {
          console.log(e);
      });
    }


}
