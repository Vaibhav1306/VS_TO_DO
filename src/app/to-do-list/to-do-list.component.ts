import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskDialogComponent } from '../add-new-task-dialog/add-new-task-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDrop } from '../Interfaces/drag-drop';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  completedTasks: any = [];
  form: any;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      taskList: new FormArray([]),
    });
  }

  drop(event: CdkDragDrop<Array<DragDrop>>) {
    moveItemInArray(
      this.getTaskList().controls,
      event.previousIndex,
      event.currentIndex
    );
  }

  getTaskList() {
    return this.form.controls['taskList'] as FormArray;
  }

  deleteTask(index: number) {
    const currentIndex = this.getTaskList().controls.length - (index + 1);
    const currentTask =
      this.getTaskList().controls[currentIndex].value.taskName;
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: currentTask,
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const control1 = this.form.controls.taskList.controls;
      control1.splice(currentIndex, 1);
    });
  }

  endTask(index: any) {
    this.completedTasks.splice(index, 1);
  }

  redeemTask(index: any) {
    const control1 = this.form.controls.taskList.controls;
    control1.push(new FormControl(this.completedTasks[index]));
    this.endTask(index);
  }

  finishTask(index: number) {
    const currentIndex = this.getTaskList().controls.length - (index + 1);
    const currentTask = this.getTaskList().controls[currentIndex].value;
    const control1 = this.form.controls.taskList.controls;
    this.completedTasks.push(currentTask);
    control1.splice(currentIndex, 1);
  }

  onAddNewTask() {
    const dialogRef = this.dialog.open(AddNewTaskDialogComponent, {
      disableClose: true,
      width: '400px',
      height: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const control1 = this.form.controls.taskList.controls;
      control1.push(new FormControl(result));
    });
  }

  onEditTask(index: number) {
    const currentIndex = this.getTaskList().controls.length - (index + 1);
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: this.getTaskList().controls[currentIndex].value,
      disableClose: true,
      width: '400px',
      height: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.getTaskList().controls[currentIndex].patchValue(result);
    });
  }
}
