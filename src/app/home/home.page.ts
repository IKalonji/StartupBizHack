import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HomePageCards } from '../models/home-cards.models';
import { transactionCards } from '../models/transaction-cards.models';
import {account1, account2} from '../models/account.models'

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  optionCardsFirstRow = HomePageCards.slice(0,3);
  optionCardsSecondRow = HomePageCards.slice(3,6);
  optionCardsThirdRow = HomePageCards.slice(6);
  
  cardRows = [this.optionCardsFirstRow, this.optionCardsSecondRow, this.optionCardsThirdRow]

  transactionCards = transactionCards;

  userAccount : string = ''

  balance : string = '';
  availableBalance : string = '';

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private http: HttpClient
  ) {}
  
  ngOnInit(): void {
    this.setAccount();
  }

  async onClick(id:string){
    
    switch(id){
      case "cashin":
        let alertController = await this.alertController.create({
          header: "Card top up is currently offline",
          message: "Please try again later.",
          buttons: [
            'Ok'
          ]
        });
        await alertController.present();
        break;
      case "cashout":
        let alertControllerSecond = await this.alertController.create({
          header: "Card top up is currently offline",
          message: "Please try again later.",
          buttons: [
            'Ok'
          ]
        });
        await alertControllerSecond.present();
        break;
    }
  }

  async displayModal(row:any){
    const account = await this.modalController.create(
      {
        component: row.component,
        showBackdrop: true,
        cssClass: "my-custom-modal-css",
        backdropDismiss: true,
        swipeToClose: true
      }
    );
    return await account.present()
  }

  async setAccount(){
    let select = await this.alertController.create(
      {
        header: "Account",
        buttons: [
          {
            text: 'Account 1',
            handler: () => {
              this.userAccount = account1;
              this.getBalances();
            }
          }, {
            text: 'Account 2',
            handler: () => {
              this.userAccount = account2;
              this.getBalances();
            }
          }
        ]
      }
    )
    await select.present();
  }

  getBalances(){
    return this.http.get<any>(`https://telkomhackpythonapi.herokuapp.com/balance/${this.userAccount}`).subscribe(data =>{
      data = data
      this.balance = data.balance
      this.availableBalance = data.available
      console.log(this.availableBalance);
    })
  }

}

// export const transactionCards = [
//   {
//     txId: 1234,
//     type: "Payment",
//     amount: 500,
//     status: "Pending",
//     buttonText: "Approve Payment"
//   },
//   {
//     txId: 5678,
//     type: "Receipt",
//     amount: 200,
//     status: "Completed",
//     buttonText: false
//   },
//   {
//     txId: 9101,
//     type: "Receipt",
//     amount: 350,
//     status: "Awaiting Delivery",
//     buttonText: "Start Delivery"
//   },
// ]
