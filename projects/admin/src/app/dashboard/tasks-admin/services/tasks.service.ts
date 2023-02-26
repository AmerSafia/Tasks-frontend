import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasks(filter: any) {
    let params = new HttpParams()
    Object.entries(filter).forEach(([key, value]:any) => {
      if (value) {
        params = params.append(key, value)
      }
    });

    return this.http.get(environment.baseApi + '/all-tasks', { params })
  }
  createTask(model: FormData) {
    return this.http.post(environment.baseApi + '/add-task', model)
  }
  updateTask(task: any, id: any) {
    return this.http.put(environment.baseApi + '/edit-task/' + id, task)
  }
  deleteTask(id: string) {
    return this.http.delete(environment.baseApi + '/delete-task/' + id)
  }
}
