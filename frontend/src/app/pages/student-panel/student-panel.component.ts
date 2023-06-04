import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student';
import { StudentsService } from 'src/app/services/students.service';
import { AddEditPanelComponent } from './add-edit-panel/add-edit-panel.component';
@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    ReactiveFormsModule,
    AddEditPanelComponent,
  ],
  providers: [ConfirmationService, MessageService],
})
export class StudentPanelComponent {
  student: Student[] = [];
  displayAddEditModal = false; //ekleme ekranının görünürlüğü
  selectedStudent: any = null;
  subscriptions: Subscription[] = [];
  studentSubscriptions: Subscription = new Subscription();

  constructor(
    private studentService: StudentsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList() {
    this.studentSubscriptions = this.studentService
      .getStudent()
      .subscribe((response) => {
        //getStudent bir observable nesnesi döndürür(Student[])
        //.subscribe ile bu nesneye abone olunur ve sonuçlar response değişkeninde saklanır
        this.student = response;
        //student burada güncellenir, çünkü dbden alınmış bilgiler üstte response'a atanmıştır.
        this.student = [...this.student];
        //!iste burasını anlamadım ya
      });
    console.log(this.student);
    this.subscriptions.push(this.studentSubscriptions);
    //güncel alınan veriler studentSubscriptions objesinden subscriptions dizisine pushlanır.
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedStudent = null;
    //modali açtığında boş gelir
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    //eventtan true gelince isClosed true olur.
    //displayine böylece false verir ve modal gizlenir.
  }

  saveOrUpdateStudentToList(newData: any) {
    this.getStudentList();
    //data gelince sayfa yenilenecek
  }

  showEditModal(student: Student) {
    this.displayAddEditModal = true;
    this.selectedStudent = student;
    //tıklanan mevcut studenti gösterir.
  }

  deleteStudent(student: Student) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this student?',
      accept: () => {
        this.studentService.deleteStudent(student.id).subscribe(
          (response) => {
            this.student = this.student.filter(
              (data) => data.id !== student.id
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'The Student is successfully deleted',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Success',
              detail: 'The Student is can deleted',
              ////////////////!!!!
            });
          }
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
