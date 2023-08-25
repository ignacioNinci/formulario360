import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { Datum, ExecuteQueryActionsScreen } from 'src/app/interfaces/interfaces';
import { GetCollectionsService } from 'src/app/services/get-collections.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [];
  dataSource: any;

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
  
  get dateError() {
    return this.miFormulario.get('date')?.hasError('maxlength');
  }

  get availableError() {
    return this.miFormulario.get('available')?.hasError('maxlength');
  }

  get nameError() {
    return this.miFormulario.get('name')?.hasError('maxlength');
  }

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

  closeCollection() {
    this.miFormulario.reset();
  }
  

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  
  filteredData(): void {
    const filterText = this.miFormulario.get('name')?.value.toLowerCase();
    const filterTextDate = this.miFormulario.get('date')?.value;
    const filterTextAvailable = this.miFormulario.get('available')?.value;
    
    this.filteredDataTable = this.tableData.filter(item =>
      item.payment_date.toLowerCase().includes(filterTextDate) &&
      item.payer_name.toLowerCase().includes(filterText) &&
      item.available_at.toLowerCase().includes(filterTextAvailable)
    );
    
    if ((filterTextDate !== '' || filterTextAvailable !== '' || filterText !== '') && this.filteredDataTable.length === 0) {
      this.hasError = true;
      this.isShow = false;
    } else {
      this.hasError = false; 
      this.isShow = true;
    }
  }

 




  
  

  
}
