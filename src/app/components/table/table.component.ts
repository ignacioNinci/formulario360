import { transition } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Subscription, map } from 'rxjs';
import { Datum, ExecuteQueryActionsScreen } from 'src/app/interfaces/interfaces';
import { GetCollectionsService } from 'src/app/services/get-collections.service';
import Swal from 'sweetalert2';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  first: number = 0;
  @ViewChild('dt1') dataTable!: Table

    rows: number = 10;

    onPageChange(event: PageEvent | any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    onInputChanged(event: any) {
      if (event.target) {
          const filterValue = event.target.value;
          this.dataTable.filterGlobal(filterValue, 'contains');
      }
  }
  
    getColumnProperties(dataTable: any[]): string[] {
      const properties: string[] = [];
  
      if (dataTable && dataTable.length > 0) {
          const firstObject = dataTable[0];
          for (const prop in firstObject) {
              if (firstObject.hasOwnProperty(prop)) {
                properties.push(prop);
              }
          }
      }
  
      return properties;
  }

  clear(table: Table) {
    table.clear();
  }

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
    this.totalPages = this.calculateTotalPages();
    this.changePage(1);
  }


  miFormulario: FormGroup = this.fb.group({
    date: ['', [Validators.maxLength(10)]],
    name: ['', [Validators.maxLength(30)]],
    available: ['', [Validators.maxLength(10)]]
  })
  

  getAllCollections(): void {
    this.loading = !this.loading;
    this.isShow = true;
    this.dataSubscription = this.getColl.getCollections().pipe(
      map((res: ExecuteQueryActionsScreen) => {
        let { data } = res;

        const traslation: Datum = {
          informed_date: 'Fecha informada',
          request_id: 'ID de solicitud',
          external_reference: 'Referencia externa',
          payer_name: 'Nombre del pagador',
          description: 'Descripcion',
          payment_date: 'Pago',
          channel: 'Canal',
          amount_paid: 'Cantidad pagada',
          net_fee: 'Tarifa neta',
          iva_fee: 'Tarifa de IVA',
          net_amount: 'Importe neto',
          available_at: 'Disponible en'
        }

        let newData = data.map(item => {
          let informedDate = item.informed_date.split('T')[0].split('-').reverse().join('/');
          let paymentDay = item.payment_date.split('T')[0].split('-').reverse().join('/');
          let availableAt = item.available_at.split('T')[0].split('-').reverse().join('/');
         
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



  itemsPerPage = 10; // Cantidad de elementos por página
    currentPage = 1; // Página actual
    totalPages: number[] = []; // Array de números de página

   

    calculateTotalPages(): number[] {
        const totalItems = this.filteredDataTable.length > 0 ? this.filteredDataTable.length : this.tableData.length;
        const pages = Math.ceil(totalItems / this.itemsPerPage);
        return Array.from({ length: pages }, (_, i) => i + 1);
    }

    changePage(pageNumber: number) {
        this.currentPage = pageNumber;
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        
        if (this.filteredDataTable.length > 0) {
            this.tableData = this.filteredDataTable.slice(startIndex, endIndex);
        } else {
            this.tableData = this.tableData.slice(startIndex, endIndex);
        }
    }








 




  
  

  
}
