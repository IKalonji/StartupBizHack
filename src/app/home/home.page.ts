import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

export class HomePage implements OnInit, AfterViewInit{

  @ViewChild('bal', {static: false}) bal : ElementRef;
  @ViewChild('avail', {static: false}) avail : ElementRef;

  optionCardsFirstRow = HomePageCards.slice(0,3);
  optionCardsSecondRow = HomePageCards.slice(3,6);
  optionCardsThirdRow = HomePageCards.slice(6);
  
  cardRows = [this.optionCardsFirstRow, this.optionCardsSecondRow, this.optionCardsThirdRow]

  transactionCards = transactionCards;

  userAccount : string = ''

  balance: any;

  available: any;
  balanceData: any;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private http: HttpClient
  ) {}

  ngAfterViewInit(){
  }
  
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
              this.balance = 0
              this.available = 0
            }
          }, {
            text: 'Account 2',
            handler: () => {
              this.userAccount = account2;
              this.balance = 20
              this.available = 20
            }
          }
        ]
      }
    )
    
    await select.present();
  }

}