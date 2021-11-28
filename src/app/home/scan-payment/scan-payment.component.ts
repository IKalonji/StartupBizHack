import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-cash-out',
  templateUrl: './scan-payment.component.html',
  styleUrls: ['./scan-payment.component.scss'],
})
export class ScanPaymentComponent implements OnInit {
  

  constructor(private barcodeScanner: BarcodeScanner) { } //


  data: any;
  jsonData: any;

  ngOnInit() {
    this.scanner();
  }

  scanner(){
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data = barcodeData;
      this.jsonData = JSON.parse(this.data)
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
