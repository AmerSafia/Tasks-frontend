import { CreateTask } from './../context/DTOs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get('https://cruds-el2j.onrender.com/tasks/all-tasks')
  }
  createTask(model: FormData) {
    return this.http.post('https://cruds-el2j.onrender.com/tasks/add-task', model)
  }
}
