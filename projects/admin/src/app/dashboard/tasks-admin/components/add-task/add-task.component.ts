import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog, private service: TasksService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }
  taskForm!: FormGroup
  filename = ''
  users: any = [
    { name: "Amersafia", id: '63dd544d739328e088132c48' },
    { name: "Ali", id: '63dd54e5739328e088132c54' },
  ]
  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      userId: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
    })
  }

  createTask() {
    this.spinner.show()
    const dialogRef = this.dialog
    let formData = new FormData()
    const date = moment(this.taskForm.value['deadline']).format('DD-MM-YYYY')
    Object.entries(this.taskForm.value).forEach(([key, item]: any) => {
      if (key == 'deadline') {
        formData.append(key, date)
      } else {
        formData.append(key, item)
      }
    })
    this.service.createTask(formData).subscribe(res => {
      this.toastr.success('success', 'Task Created Successfully!')
      this.spinner.hide()

      dialogRef.close()
    }, err => {

      this.toastr.success('error', err.error.message)

      this.spinner.hide()

    })

  }
  selectImage(e: any) {
    this.filename = e.target.value
    this.taskForm.get('image')?.setValue(e.target.files[0])
  }
}
