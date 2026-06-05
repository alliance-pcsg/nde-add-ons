import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'custom-orca-cover-dialog',
  standalone: true,
  imports: [],
  templateUrl: './orca-cover-dialog.component.html',
  styleUrl: './orca-cover-dialog.component.scss'
})
export class OrcaCoverDialogComponent {
  constructor(
    public ref: DialogRef<OrcaCoverDialogComponent>,
    @Inject(DIALOG_DATA) public data: {
      enlargedCoverUrl: string,
      altText?: string
    }
  ) {}
}
