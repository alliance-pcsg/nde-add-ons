import { Component, Input, Inject, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Dialog } from '@angular/cdk/dialog';
import { OrcaCoverDialogComponent } from './orca-cover-dialog/orca-cover-dialog.component';

@Component({
  selector: 'custom-orca-enlarge-cover',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './orca-enlarge-cover.component.html',
  styleUrl: './orca-enlarge-cover.component.scss'
})
export class OrcaEnlargeCoverComponent {
  public enlargedLink$!: Observable<string>;
  private thumbUrl: any;
  public buttonText: string = 'View Cover';
  public altText: string = 'Cover Image';
  private dialog: Dialog = inject(Dialog);
  
  // Get configurable parameters
  constructor(@Inject('MODULE_PARAMETERS') public moduleParameters: any) {
    if (moduleParameters.buttonText) {
      this.buttonText = moduleParameters.buttonText;
    }
  }
  
  // Create the enlarged cover URL after the parent component's imageLink$ is available
  @Input() set hostComponent(recordImage: any) {
    if (!recordImage?.imageLink$) {
      this.enlargedLink$ = of('');
      return;
    }
    this.enlargedLink$ = recordImage.imageLink$.pipe(
      filter((thumbUrl: string | null | undefined): thumbUrl is string => !!thumbUrl),
      map((thumbUrl: string) => this.toEnlargedCoverUrl(thumbUrl)),
    );
    // Get the item title from PNX for alt text
    if (typeof(recordImage.item.pnx.display.title) != undefined) {
      this.altText = recordImage.item.pnx.display.title[0];
    }
  }

  // Display the cover image in a dialog modal
  public openCoverDialog(enlargedCoverUrl: string) {
    this.dialog.open(OrcaCoverDialogComponent, { data: { enlargedCoverUrl, altText: this.altText } });
  }
  
  // Return thumbnail image URL
  private toEnlargedCoverUrl(thumbUrl: string): string {
    if (thumbUrl.indexOf('defaultThumbnailIcons') != -1) {
      return '';
    }
    else {
      return thumbUrl;
    }
  }
  
}
