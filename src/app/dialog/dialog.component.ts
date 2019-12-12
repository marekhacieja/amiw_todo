import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Task} from '../task';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public task: Task, private taskService: TaskService) {
  }

  addDescription(value: string) {
    this.taskService.addDescription(value, this.task);
  }
}
