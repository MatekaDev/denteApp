import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the AddUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-usuario',
  templateUrl: 'add-usuario.html',
})
export class AddUsuarioPage {

   /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description     Define FormGroup property for managing form validation / data retrieval
    */
   public form                   : FormGroup;

   /**
    * @name UsuarioCod
    * @type {Any}
    * @public
    * @description     Model for managing UsuarioCod field
    */
   public UsuarioCod         : any;

   /**
    * @name UsuarioDescription
    * @type {Any}
    * @public
    * @description     Model for managing Usuarioemail field
    */
   public Usuarioemail  : any;

   /**
    * @name UsuarioSenha
    * @type {Any}
    * @public
    * @description     Model for managing UsuarioSenha field
    */
   public UsuarioSenha  : any;

   /**
    * @name UsuarioNome
    * @type {Any}
    * @public
    * @description     Model for managing UsuarioNome field
    */
   public UsuarioNome  : any;

   /**
    * @name isEdited
    * @type {Boolean}
    * @public
    * @description     Flag to be used for checking whether we are adding/editing an entry
    */
   public isEdited               : boolean = false;

   /**
    * @name hideForm
    * @type {Boolean}
    * @public
    * @description     Flag to hide the form upon successful completion of remote operation
    */
   public hideForm               : boolean = false;

   /**
    * @name pageTitle
    * @type {String}
    * @public
    * @description     Property to help set the page title
    */
   public pageTitle              : string;

   /**
    * @name recordID
    * @type {String}
    * @public
    * @description     Property to store the recordID for when an existing entry is being edited
    */
   public recordID               : any      = null;

   /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     Remote URI for retrieving data from and sending data to
    */
   private baseURI               : string  = "../../../src/";

   // Initialise module classes
   constructor(public navCtrl    : NavController,
               public http       : HttpClient,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController)
   {

      // Create form builder validation rules
      this.form = fb.group({
         "usr_email"                : ["", Validators.required],
		 "usr_senha"                : ["", Validators.required],
		 "usr_nome"                 : ["", Validators.required]
      });
   }

   /**
    * Triggered when template view is about to be entered
    * Determine whether we adding or editing a record
    * based on any supplied navigation parameters
    *
    * @public
    * @method ionViewWillEnter
    * @return {None}
    */
   ionViewWillEnter() : void
   {
      this.resetFields();

      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Amend entry';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Create entry';
      }
   }

   /**
    * Assign the navigation retrieved data to properties
    * used as models on the page's HTML form
    *
    * @public
    * @method selectEntry
    * @param item 		{any} 			Navigation data
    * @return {None}
    */
   selectEntry(item : any) : void
   {
	  this.UsuarioCod        = item.usr_cod;
      this.Usuarioemail      = item.usr_email;
      this.UsuarioSenha      = item.usr_senha;
      this.UsuarioNome       = item.usr_nome;
   }

   /**
    * Save a new record that has been added to the page's HTML form
    * Use angular's http post method to submit the record data
    *
    * @public
    * @method createEntry
    * @param name 			{String} 			Name value from form field
    * @param description 	{String} 			Description value from form field
    * @return {None}
    */
   createEntry(email : string, senha : string, nome : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "create", "usr_email" : email, "usr_senha" : senha, "usr_nome" : nome},
          url       : any      	= this.baseURI + "manage-data.php";
	
		
      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.hideForm   = true;
         this.sendNotification(`Congratulations the Usuario: ${nome} was successfully added`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }

   /**
    * Update an existing record that has been edited in the page's HTML form
    * Use angular's http post method to submit the record data
    * to our remote PHP script
    *
    * @public
    * @method updateEntry
    * @return {None}
    */
   updateEntry(email : string, senha : string, nome : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "update","usr_email" : email, "usr_senha" : senha, "usr_nome" : nome},
          url       : any      	= this.baseURI + "manage-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         this.hideForm  =  true;
         this.sendNotification(`Congratulations the Usuario: ${nome} was successfully updated`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }

   /**
    * Remove an existing record that has been selected in the page's HTML form
    * Use angular's http post method to submit the record data
    * to our remote PHP script
    *
    * @public
    * @method deleteEntry
    * @return {None}
    */
   deleteEntry() : void
   {
      let name      : string 	= this.form.controls["name"].value,
          headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "delete", "usr_cod" : this.UsuarioCod},
          url       : any      	= this.baseURI + "manage-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         this.hideForm     = true;
         this.sendNotification(`Congratulations the Usuario: ${nome} was successfully deleted`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }

   /**
    * Handle data submitted from the page's HTML form
    * Determine whether we are adding a new record or amending an
    * existing record
    *
    * @public
    * @method saveEntry
    * @return {None}
    */
   saveEntry() : void
   {
      let email : string = this.form.controls["usr_email"].value,
		  senha : string = this.form.controls["usr_senha"].value,
          nome  : string = this.form.controls["usr_nome"].value;

      if(this.isEdited)
      {
         this.updateEntry(email, senha, nome);
      }
      else
      {
         this.createEntry(email, senha, nome);
      }
   }

   /**
    * Clear values in the page's HTML form fields
    *
    * @public
    * @method resetFields
    * @return {None}
    */
   resetFields() : void
   {
      this.Usuarioemail = "";
      this.UsuarioSenha = "";
      this.UsuarioNome  = "";
   }

   /**
    * Manage notifying the user of the outcome of remote operations
    *
    * @public
    * @method sendNotification
    * @param message 	{String} 			Message to be displayed in the notification
    * @return {None}
    */
   sendNotification(message : string)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }
}
