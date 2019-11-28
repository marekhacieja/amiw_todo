import {Component} from '@angular/core';
import {Task} from './task';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DialogComponent} from './dialog/dialog.component';
import {MatDialog} from '@angular/material';
import {TaskService} from './service/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todo: Task[] = [];
  done: Task[] = [];

  constructor(public dialog: MatDialog, private taskService: TaskService) {
    this.taskService.getTodoTasksObs().subscribe((tasks: Array<Task>) =>
      this.todo = tasks);
    this.taskService.getDoneTasksObs().subscribe((tasks: Array<Task>) =>
      this.done = tasks);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.taskService.setTodoTasksToLocalStorage();
    this.taskService.setDoneTasksToLocalStorage();
  }

  openDialog(task: Task): void {
    this.dialog.open(DialogComponent, {data: task});
  }

  addTask(taskText: string) {
    this.taskService.addTask(taskText);
  }

  addTaskToDone(task: Task) {
    this.taskService.addTaskToDone(task);
  }

  deleteTaskFromTodo(task: Task) {
    this.taskService.deleteTaskFromTodo(task);
  }

  deleteTaskFromDone(task: Task) {
    this.taskService.deleteTaskFromDone(task);
  }

}
