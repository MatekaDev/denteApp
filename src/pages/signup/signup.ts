/*import { NgForm } from '@angular/forms';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { TabsPage } from '../tabs-page/tabs-page';*/

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { ToastController } from 'ionic-angular';
import { IonicErrorHandler } from 'ionic-angular';
import { NgModule, ErrorHandler } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'signup.html'
})

@NgModule({
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})

export class SignupPage {
  /*constructor(public navCtrl: NavController, public userData: UserData, public http : HttpClient) {}*/
  
   /**
    * @name items
    * @type {Array}
    * @public
    * @description     Used to store returned PHP data
    */
  	
   public items : Array<any> = [];
      
   constructor(public navCtrl: NavController,
               public http : HttpClient,
			   public toastCtrl  : ToastController){}
   
   /*onSignup(form: NgForm) {
    this.submitted = true;
	
	
    if (form.valid) {
      this.userData.signup(this.signup.username);
      this.navCtrl.push(TabsPage);
    }
	
   }*/
   
   /**
    * Triggered when template view is about to be entered
    * Returns and parses the PHP data through the load() method
    *
    * @public
    * @method ionViewWillEnter
    * @return {None}
    */

   ionViewWillEnter() : void
   {
	  this.load();
   }

   /**
    * Retrieve the JSON encoded data from the remote server
    * Using Angular's Http class and an Observable - then
    * assign this to the items array for rendering to the HTML template
    *
    * @public https://denteapp.000webhostapp.com/retrieve-data.php
    * @method load 
    * @return {None} 
    * exemplo url:*/
   load() : void
   {  
	  this.http
      .get('http://denteapp.000webhostapp.com/retrieve-data.php')
      .subscribe((data : any) =>
      {
		  let toast = this.toastCtrl.create({
			message: "YEAP",
			duration: 3000,
			position: 'top'
		  });
		  toast.present();

		 console.dir(data);
         this.items = data;
	 },
	 (error : any) =>
     {
		  let toast = this.toastCtrl.create({
			message: "NOPS",
			duration: 3000,
			position: 'top'
		  });
		  toast.present();
		  
          console.dir(error);
     });
	 //this.items = [{"usr_email":"matheusflawless@gmail.com","usr_senha":"TCCUlbra2507","usr_nome":"Matheus"},{"usr_email":"teste@teste.com","usr_senha":"","usr_nome":"teste"}];
  }
   
   /**
    * Allow navigation to the AddUsuario for creating a new entry
    *
    * @public
    * @method addEntry
    * @return {None}
    */
   addEntry() : void
   {
      this.navCtrl.push('AddUsuarioPage');
   }

   /**
    * Allow navigation to the AddUsuarioPage for amending an existing entry
    * (We supply the actual record to be amended, as this method's parameter,
    * to the AddUsuarioPage
    *
    * @public
    * @method viewEntry
    * @param param 		{any} 			Navigation data to send to the next page
    * @return {None}
    */
   viewEntry(param : any) : void
   {
      this.navCtrl.push('AddUsuarioPage', param);
   }
  
}
/*
export class HomePage {
   public items : Array<any> = [];

   constructor(public navCtrl: NavController,
               public http   : HttpClient)
   {

   }

   ionViewWillEnter() : void
   {
      this.load();
   }

   load() : void
   {
      this.http
      .get('C:\Users\MatheusShadow\denteApp\src\retrieve-data.php') 
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }

   addEntry() : void
   {
      this.navCtrl.push('AddUsuarioPage');
   }
   viewEntry(param : any) : void
   {
      this.navCtrl.push('AddUsuarioPage', param);
   }
}
*/