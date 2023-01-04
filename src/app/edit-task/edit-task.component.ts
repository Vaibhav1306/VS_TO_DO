import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DragDrop } from '../Interfaces/drag-drop';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  form: any;
  taskData: any;
  formChanged = false;

  constructor(
    private dialog: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.taskData = data;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      taskName: new FormControl(this.taskData.taskName, Validators.required),
      taskDescription: new FormControl(
        this.taskData.taskDescription,
        Validators.required
      ),
      date: new FormControl(formatDate(new Date(), 'M/d/yy, h:mm a', 'en-US')),
    });

    this.form.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
  }

  onCancel() {
    this.dialog.close(false);
  }

  onEditTask() {
    this.dialog.close(this.form.value);
  }
}
