import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

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
  users: any = [
    { name: "Moahmed", id: 1 },
    { name: "Ali", id: 2 },
    { name: "Ahmed", id: 3 },
    { name: "Zain", id: 4 },
  ]

  status: any = [
    { name: "Complete", id: 1 },
    { name: "In-Prossing", id: 2 },
  ]
  constructor(private service: TasksService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,

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
  getAllTasks() {
    this.spinner.show()
    this.service.getAllTasks().subscribe((res: any) => {
      this.dataSource = this.mapTasks(res.tasks)
      this.spinner.hide()
    }, err => {
      this.spinner.hide()
      this.toastr.success('error', err.error.message)
    })

  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      // data: 
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllTasks()
      }
    });
  }

  deleteTask(id: string) {
    this.spinner.show()
    this.service.deleteTask(id).subscribe(res => {
      this.getAllTasks()
      this.spinner.hide()
    }, err => {
      this.toastr.error(err.error.message)
      this.spinner.hide()
    })
  }
  updateTask(element:object){
    console.log(element);
    
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: element
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllTasks()
      }
    });

  }
}
