import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClassService } from 'src/app/services/class.service';
@Component({
  selector: 'app-add-edit-panel',
  templateUrl: './add-edit-panel.component.html',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class AddEditPanelComponent implements OnInit, OnChanges {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedClass: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  //clickclose olayına abone olan bileşenlere boolean türünde veri sağlar.
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = '';

  classForm = this.fb.group({
    name: ['', Validators.required],
    capacity: [0, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedClass) {
      this.modalType = 'Edit';
      //edit modalini açar
      this.classForm.patchValue(this.selectedClass);
      //classForma kendi verisini yerleştirmek için patchValue() kullanılır
    } else {
      this.classForm.reset();
      //classForma reset atar, yani kutucuklar boş gelir.
      this.modalType = 'Add';
      //add modalini açtırır
    }
  }

  closeModal() {
    this.classForm.reset();
    //formu resetler
    this.clickClose.emit(true);
    //dışarıya true olarak gider=>user.compenent.html
  }

  addEditClass() {
    console.log(this.classForm.value);
    this.classService
      .AddEditClass(this.classForm.value, this.selectedClass)
      .subscribe(
        (response) => {
          this.clickAddEdit.emit(response);
          //verileri clickaddedite atar.
          this.closeModal();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Class Succesfuly Added.',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Class Succesfuly Added.', //yaz
          });
          console.log('Errror occured');
        }
      );
  }
}
