import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } 
        from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-profile',
  templateUrl: './create-qr.component.html',
  styleUrls: ['./create-qr.component.scss'],
})
export class CreateQrComponent implements OnInit {
  
  showQRCode = false;

  // We can have Canvas/Img/Url as elementType
  elementType = NgxQrcodeElementTypes.URL;
  
  // We can have High/Low/Medium/Quartile
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  
  // Need to specify the valid website address
  value : string = '';

  amount : string = '';

  description : string = '';
  
  account : string = "123456789";

  seller : string = "Mr. Issa"

  constructor(private toastController: ToastController) { }

  ngOnInit() {}

  showQR(){
    let QRMetaData = {
      description: this.description,
      amount: this.amount,
      account : this.account, 
      seller : this.seller
    };

    this.value = JSON.stringify(QRMetaData);

    this.showQRCode = true;

  }

  async export(){
    let toast = await this.toastController.create({
      header: "Done",
      message: "Successfully exported",
      position: 'bottom',
      duration: 2000,
      animated: true,
      color: "success"
    });

    await toast.present();
  }

}
