import {Injectable} from '@angular/core';
import {Task} from '../task';
import {BehaviorSubject, Observable} from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {
  }

  private done: Array<Task> = this.getSessionStorage('doneTasks');
  private todo: Array<Task> = this.getSessionStorage('todoTasks');
  private todoTasksObs = new BehaviorSubject<Array<Task>>(this.todo);
  private doneTasksObs = new BehaviorSubject<Array<Task>>(this.done);

  addTask(taskText: string) {
    if (taskText === '' || this.validateTask(taskText)) {
      return;
    }
    const newTask = new Task();
    newTask.timestamp = moment().format();
    newTask.text = taskText;
    this.todo.push(newTask);
    this.setTodoTasksToLocalStorage();
    this.todoTasksObs.next(this.todo);
  }

  addTaskToDone(task: Task) {
    this.deleteTaskFromTodo(task);
    this.done.push(task);
    this.setDoneTasksToLocalStorage();
    this.doneTasksObs.next(this.done);
  }

  deleteTaskFromTodo(task: Task) {
    this.todo = this.todo.filter(e => e !== task);
    this.setTodoTasksToLocalStorage();
    this.todoTasksObs.next(this.todo);
  }

  deleteTaskFromDone(task: Task) {
    this.done = this.done.filter(e => e !== task);
    this.setDoneTasksToLocalStorage();
    this.doneTasksObs.next(this.done);
  }

  getTodoTasksObs(): Observable<Array<Task>> {
    return this.todoTasksObs.asObservable();
  }

  getDoneTasksObs(): Observable<Array<Task>> {
    return this.doneTasksObs.asObservable();
  }

  addDescription(value: string, task: Task) {
    for (const taskTodo of this.todo) {
      if (taskTodo === task) {
        taskTodo.description = value;
      }
    }
    for (const taskTodo of this.done) {
      if (taskTodo === task) {
        taskTodo.description = value;
      }
    }
    this.setDoneTasksToLocalStorage();
    this.setTodoTasksToLocalStorage();
  }

  private validateTask(taskText: string) {
    return this.todo.filter(task => task.text === taskText).length !== 0
      || this.done.filter(task => task.text === taskText).length !== 0;
  }

  public setDoneTasksToLocalStorage() {
    localStorage.setItem('doneTasks', JSON.stringify(this.done));
  }

  public setTodoTasksToLocalStorage() {
    localStorage.setItem('todoTasks', JSON.stringify(this.todo));
  }

  private getSessionStorage(key: string): Array<Task> {
    if (JSON.parse(localStorage.getItem(key)) === null) {
      return [];
    }
    return JSON.parse(localStorage.getItem(key));
  }
}

