import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { Datum, ExecuteQueryActionsScreen } from 'src/app/interfaces/interfaces';
import { GetCollectionsService } from 'src/app/services/get-collections.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  

  constructor( private getColl: GetCollectionsService,
               private fb: FormBuilder ) { }

  private dataSubscription!: Subscription;
  loading: boolean = false;
  isShow: boolean = false;
  hasError: boolean = false;
  tableData: Datum[] = [];
  filteredDataTable: any[] = [];
  filterDate: string = ''

  ngOnInit(): void {
    // this.getAllCollections();
  }


  miFormulario: FormGroup = this.fb.group({
    date: ['', [Validators.maxLength(10)]],
    name: ['', [Validators.maxLength(30)]],
    available: ['', [Validators.maxLength(10)]]
  })
  
  // get dateError() {
  //   return this.miFormulario.get('date')?.hasError('maxlength');
  // }

  // get availableError() {
  //   return this.miFormulario.get('available')?.hasError('maxlength');
  // }

  // get nameError() {
  //   return this.miFormulario.get('name')?.hasError('maxlength');
  // }

  getAllCollections(): void {
    this.loading = !this.loading;
    this.isShow = true;
    this.dataSubscription = this.getColl.getCollections().pipe(
      map((res: ExecuteQueryActionsScreen) => {
        let { data } = res;
        let newData = data.map(item => {
          let informedDate = item.informed_date.split('T')[0].split('-').reverse().join('-');
          let paymentDay = item.payment_date.split('T')[0].split('-').reverse().join('-');
          let availableAt = item.available_at.split('T')[0].split('-').reverse().join('-');
          return {
            ...item,
            available_at: availableAt,
            informed_date: informedDate, 
            payment_date: paymentDay
          };
        });
        return newData;
      })
    ).subscribe(response => {
      console.log(response);
      this.tableData = response
      this.loading = false;
    });
  }
  formDataChange(formData: any) {
    this.filteredData(formData);
    if (this.hasError) {
      Swal.fire({
        title: 'Error!',
        text: 'No encontrado!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }
  

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  
  filteredData(formData: any): void {
    const filterTextDateInformed = formData.date;
    const filterTextRequest = formData.request;
    const filterTextReference = formData.reference;
    const filterTextName = formData.name;
    const filterTextDescription = formData.description;
    const filterTextPayment = formData.payment;
    const filterTextChannel = formData.channel;
    const filterTextPaid = formData.paid;
    const filterTextNet = formData.net;
    const filterTextIva = formData.iva;
    const filterTextNetAmount = formData.netAmount;
    const filterTextAvailable = formData.available;
    
    this.filteredDataTable = this.tableData.filter(item =>
      item.informed_date.toLowerCase().includes(filterTextDateInformed) &&
      item.request_id.toString().includes(filterTextRequest) &&
      item.external_reference.toLowerCase().includes(filterTextReference) &&
      item.payer_name.toLowerCase().includes(filterTextName) &&
      item.description.toLowerCase().includes(filterTextDescription) &&
      item.payment_date.toLowerCase().includes(filterTextPayment) &&
      item.channel.toLowerCase().includes(filterTextChannel) &&
      item.amount_paid.toString().includes(filterTextPaid) &&
      item.net_fee.toString().includes(filterTextNet) &&
      item.iva_fee.toString().includes(filterTextIva) &&
      item.net_amount.toString().includes(filterTextNetAmount) &&
      item.available_at.toLowerCase().includes(filterTextAvailable)
      );
    
    if ((filterTextDateInformed !== '' || filterTextRequest !== '' || filterTextReference !== '' || filterTextName !== '' || filterTextDescription !== '' || filterTextPayment !== '' || filterTextChannel !== '' || filterTextPaid !== '' || filterTextNet !== '' || filterTextIva !== '' || filterTextNetAmount !== '' || filterTextAvailable !== '') && this.filteredDataTable.length === 0) {
      this.hasError = true;
      this.isShow = false;
    } else {
      this.hasError = false; 
      this.isShow = true;
    }
  }




 




  
  

  
}
