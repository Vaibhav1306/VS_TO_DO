import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],
})
export class DeleteConfirmationDialogComponent implements OnInit {
  dataFor: any;
  constructor(
    private dialog: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.dataFor = data;
    console.log(data);
  }

  ngOnInit(): void {}

  onCancel() {
    this.dialog.close(false);
  }

  onDelete() {
    this.dialog.close(true);
  }
}
