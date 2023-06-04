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
import { StudentsService } from 'src/app/services/students.service';
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
  @Input() selectedStudent: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  //clickclose olayına abone olan bileşenlere boolean türünde veri sağlar.
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = '';

  studentForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    tc: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedStudent) {
      this.modalType = 'Edit';
      //edit modalini açar
      this.studentForm.patchValue(this.selectedStudent);
      //studentforma kendi verisini yerleştirmek için patchValue() kullanılır
    } else {
      this.studentForm.reset();
      //studentforma reset atar, yani kutucuklar boş gelir.
      this.modalType = 'Add';
      //add modalini açtırır
    }
  }

  closeModal() {
    this.studentForm.reset();
    //formu resetler
    this.clickClose.emit(true);
    //dışarıya true olarak gider=>user.compenent.html
  }

  addEditStudent() {
    console.log(this.studentForm.value);
    this.studentService
      .AddEditStudent(this.studentForm.value, this.selectedStudent)
      .subscribe(
        (response) => {
          this.clickAddEdit.emit(response);
          //verileri clickaddedite atar.
          this.closeModal();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student Succesfuly Added.',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Student Succesfuly Added.', //yaz
          });
          console.log('Errror occured');
        }
      );
  }
}
