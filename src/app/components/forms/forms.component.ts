import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { Datum, ExecuteQueryActionsScreen } from 'src/app/interfaces/interfaces';
import { GetCollectionsService } from 'src/app/services/get-collections.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {


  miFormulario: FormGroup = this.fb.group({
    date: ['', [Validators.maxLength(10)]],
    name: ['', [Validators.maxLength(30)]],
    available: ['', [Validators.maxLength(10)]],
    request: ['', [Validators.maxLength(10)]],
    reference: ['', [Validators.maxLength(30)]],
    description: ['', [Validators.maxLength(10)]],
    payment: ['', [Validators.maxLength(10)]],
    channel: ['', [Validators.maxLength(30)]],
    paid: ['', [Validators.maxLength(10)]],
    net: ['', [Validators.maxLength(10)]],
    iva: ['', [Validators.maxLength(30)]],
    netAmount: ['', [Validators.maxLength(10)]],

  })
  
  @Output() formValue = new EventEmitter<any>();
  
  constructor( private fb: FormBuilder ) { 
    this.miFormulario.valueChanges.subscribe((formData) => {
      this.formValue.emit(formData);
    });
  }
  
    
    ngOnInit(): void {
      // this.getAllCollections();
    }


  
  get dateError() {
    return this.miFormulario.get('date')?.hasError('maxlength');
  }

  get availableError() {
    return this.miFormulario.get('available')?.hasError('maxlength');
  }

  get nameError() {
    return this.miFormulario.get('name')?.hasError('maxlength');
  }
  get referenceError() {
    return this.miFormulario.get('reference')?.hasError('maxlength');
  }

  get descriptionError() {
    return this.miFormulario.get('description')?.hasError('maxlength');
  }

  get paymentError() {
    return this.miFormulario.get('payment')?.hasError('maxlength');
  }
  get channelError() {
    return this.miFormulario.get('channel')?.hasError('maxlength');
  }

  get paidError() {
    return this.miFormulario.get('paid')?.hasError('maxlength');
  }

  get netError() {
    return this.miFormulario.get('net')?.hasError('maxlength');
  }
  get ivaError() {
    return this.miFormulario.get('iva')?.hasError('maxlength');
  }

  get netAmountError() {
    return this.miFormulario.get('netAmount')?.hasError('maxlength');
  }

  get requestError() {
    return this.miFormulario.get('request')?.hasError('maxlength');
  }

  filteredData() {
    this.formValue.emit(this.miFormulario.value);
  }
  

}
