import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Establishment } from 'src/app/shared';

export interface DialogData {
  establishment: Establishment;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  establishment: Establishment;

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData) {
    this.establishment = data.establishment;
  }

  ngOnInit(): void {}
}
