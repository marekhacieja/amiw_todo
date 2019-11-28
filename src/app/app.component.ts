import {Component} from '@angular/core';
import {Task} from './task';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todo: Task[] = [
    {color: 'red', text: 'zad1', date: new Date().toString()},
    {color: 'green', text: 'zad2', date: new Date().toString()},
    {color: 'green', text: 'zad3', date: new Date().toString()},
    {color: 'red', text: 'zad4', date: new Date().toString()},
    {color: 'red', text: 'zad5', date: new Date().toString()},
    {color: 'red', text: 'zad6', date: new Date().toString()}
  ];

  done: Task[] = [];


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  addTask(taskText: string) {
    const newTask = new Task();
    newTask.text = taskText;
    this.todo.push(newTask);
  }

  deleteTaskFromTodo(task: Task) {
    const index: number = this.todo.indexOf(task);
    if (index !== -1) {
      this.todo.splice(index, 1);
    }
  }

  addTaskToDone(task: Task) {
    this.deleteTaskFromTodo(task);
    this.done.push(task);
  }

  deleteTaskFromDone(task: Task) {
    const index: number = this.done.indexOf(task);
    if (index !== -1) {
      this.done.splice(index, 1);
    }
  }

  showMore(task: Task) {
    
  }
}
