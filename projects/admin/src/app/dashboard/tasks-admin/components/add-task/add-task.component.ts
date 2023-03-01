import { ConfirmationComponent } from './../confirmation/confirmation.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  taskForm!: FormGroup
  filename = ''
  formValues: any
  users: any = [
    { name: "Amersafia", id: '63dd544d739328e088132c48' },
    { name: "Ali", id: '63dd54e5739328e088132c54' },
  ]
  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.taskForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      userId: [this.data?.userId._id || '', Validators.required],
      image: [this.data?.image || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      deadline: [new Date(this.data?.deadline) || '', Validators.required],
    })
    this.formValues = this.taskForm.value

  }

  createTask() {
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
      dialogRef.close(true)
    })
  }
  selectImage(e: any) {
    this.filename = e.target.value
    this.taskForm.get('image')?.setValue(e.target.files[0])
  }
  updateTask() {
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
    this.service.updateTask(formData, this.data._id).subscribe(res => {
      this.toastr.success('success', 'Task Updated Successfully!')
      dialogRef.close(true)
    })
  }

  close() {
    let hasChange = false
    Object.keys(this.formValues).forEach(item => {
      if (this.formValues[item] !== this.taskForm.value[item]) {
        hasChange = true
      }
    })

    if (hasChange) {
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width: '400px',
         disableClose: true
      })
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
      })
    } else {
      this.dialog.close()
    }
  }
}
