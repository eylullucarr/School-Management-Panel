import { CommonModule } from '@angular/common';
import { Class } from 'src/app/models/class';
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
import { ClassService } from 'src/app/services/class.service';
import { AddEditPanelComponent } from './add-edit-panel/add-edit-panel.component';

@Component({
  selector: 'app-class-panel',
  templateUrl: './class-panel.component.html',
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
export class ClassPanelComponent {
  classes: Class[] = [];
  displayAddEditModal = false; //ekleme ekranının görünürlüğü
  selectedClass: any = null;
  subscriptions: Subscription[] = [];
  classSubscriptions: Subscription = new Subscription();

  constructor(
    private classService: ClassService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getClassList();
  }

  getClassList() {
    this.classSubscriptions = this.classService
      .getClass()
      .subscribe((response) => {
        //getClass bir observable nesnesi döndürür(Class[])
        //.subscribe ile bu nesneye abone olunur ve sonuçlar response değişkeninde saklanır
        this.classes = response;
        //class burada güncellenir, çünkü dbden alınmış bilgiler üstte response'a atanmıştır.
        this.classes = [...this.classes];
        //!iste burasını anlamadım ya
      });
    console.log(this.classes);
    this.subscriptions.push(this.classSubscriptions);
    //güncel alınan veriler classSubscriptions objesinden subscriptions dizisine pushlanır.
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedClass = null;
    //modali açtığında boş gelir
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    //eventtan true gelince isClosed true olur.
    //displayine böylece false verir ve modal gizlenir.
  }

  saveOrUpdateClassToList(newData: any) {
    this.getClassList();
    //data gelince sayfa yenilenecek
  }

  showEditModal(classes: Class) {
    this.displayAddEditModal = true;
    this.selectedClass = classes;
    //tıklanan mevcut classı gösterir.
  }

  deleteClass(classes: Class) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this class?',
      accept: () => {
        this.classService.deleteClass(classes.id).subscribe(
          (response) => {
            this.classes = this.classes.filter(
              (data) => data.id !== classes.id
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'The Class is successfully deleted',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Success',
              detail: 'The Class is can deleted',
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
