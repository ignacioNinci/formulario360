import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Subscription, map } from 'rxjs';
import { Datum, ExecuteQueryActionsScreen } from 'src/app/interfaces/interfaces';
import { GetCollectionsService } from 'src/app/services/get-collections.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {


  @ViewChild('dt1') dataTable!: Table
  
  constructor( private getColl: GetCollectionsService,
               private fb: FormBuilder ) { }
    
    private dataSubscription!: Subscription;
    loading: boolean = false;
    isShow: boolean = false;
    hasError: boolean = false;
    tableData: Datum[] = [];
    filteredDataTable: any[] = [];
    filterDate: string = ''

    miFormulario: FormGroup = this.fb.group({
      date: ['', [Validators.maxLength(10)]],
      name: ['', [Validators.maxLength(30)]],
      available: ['', [Validators.maxLength(10)]]
    })

  ngOnInit(): void {}
  
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
      this.tableData = response
      this.loading = false;
    });
  }
  
  

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  
  
  

  
}
