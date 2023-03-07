import { TranslateService } from '@ngx-translate/core';
import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

export interface PeriodicElement {
  title: string;
  user: string;
  deadLine: string;
  status: string;
}
export interface tasksElementRes {
  title: string;
  userId: object;
  deadLine: string;
  status: string;
}



@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user', 'deadLineDate', 'status', 'actions'];
  dataSource: PeriodicElement[] = [];
  tasksFilter!: FormGroup
  pageSize = 5
  page = 1
  totalTasks: any
  timeOutId: any
  users: any = [
    { name: "Amersafia", id: '63dd544d739328e088132c48' },
    { name: "Ali", id: '63dd54e5739328e088132c54' },
  ]

  status: any = [
    { name: this.translate.instant('complete') },
    { name: "In-Progress" },
  ]


  filtration: any = {}
  constructor(private service: TasksService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getAllTasks()
  }

  mapTasks(data: any[]) {
    let newTasks = data.map(item => {
      return {
        ...item,
        user: item.userId.username

      }
    })
    return newTasks
  }

  search(event: any) {
    this.filtration['keyword'] = event.target.value
    this.page = 1
    this.filtration['page'] = 1
    clearTimeout(this.timeOutId)
    this.timeOutId = setTimeout(() => {
      this.getAllTasks()
    }, 2000);
  }
  selectUser(event: any) {
    this.page = 1
    this.filtration['page'] = 1
    this.filtration['userId'] = event.value
    this.getAllTasks()

  }
  selectStatus(event: any) {
    this.page = 1
    this.filtration['page'] = 1
    this.filtration['status'] = event.value
    this.getAllTasks()
  }

  selectDate(event: any, type: string) {
    this.page = 1
    this.filtration['page'] = 1
    this.filtration[type] = moment(event.value['deadline']).format('DD-MM-YYYY')
    if (type == 'toDate' && this.filtration['toDate'] !== 'Invalid date') {
      this.getAllTasks()
    }
  }
  changePage(e: any) {
    this.page = e
    this.filtration['page'] = e
    this.getAllTasks()
  }
  getAllTasks() {

    this.service.getAllTasks({ ...this.filtration, limit: this.pageSize }).subscribe((res: any) => {
      this.dataSource = this.mapTasks(res.tasks)
      this.totalTasks = res.totalItems
    })

  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllTasks()
      }
    });
  }

  deleteTask(id: string) {

    this.service.deleteTask(id).subscribe(res => {
      this.getAllTasks()
    })
  }
  updateTask(element: object) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: element,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllTasks()
      }
    });

  }


}
