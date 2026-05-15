import { Component, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { viewName } from '../../environments/environment';

@Component({
  selector: 'orca-external-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orca-external-search.component.html',
  styleUrl: './orca-external-search.component.scss',
})
export class OrcaExternalSearchComponent {

  @Input() hostComponent!: any;

  public params: any;
  public worldcatString: string;
  public worldcatBrandName: string;
  public worldcatLogoUrl: string;
  public googleScholarLogoUrl: string;


  constructor(@Inject('MODULE_PARAMETERS') public moduleParameters: any) {
    console.log('Module parameters External Search:', this.moduleParameters);

    this.params = Object.assign({ worldcatString: "search.worldcat.org/search?q=", worldcatBrandName: "WorldCat", worldcatLogoUrl: "https://search.worldcat.org/favicons/favicon-32x32.png", googleScholarLogoUrl: "https://scholar.google.com/favicon.ico" }, moduleParameters);
    this.worldcatString = this.params.worldcatString;
    this.worldcatBrandName = this.params.worldcatBrandName;
    this.worldcatLogoUrl = this.params.worldcatLogoUrl;
    this.googleScholarLogoUrl = this.params.googleScholarLogoUrl;
  }

  ngOnInit() {
    console.log('host component instance');
    console.log('Host component instance:', this.hostComponent);
  }

  getUrlParameter(parameterName: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get(parameterName));
    return urlParams.get(parameterName);
  }

  searchMode: string | null = this.getUrlParameter('mode');
  searchQuery: string | null = this.getUrlParameter('query');




  processText(input: string): string {
    console.log(this.searchMode);



    // Check if search mode is advanced
    if (this.searchMode === 'advanced') {
      console.log("search mode equals " + this.searchMode);
      // Split the search string into separate arrays using ";"
      const arrays = input.split(";").map(segment => segment.split(","));
      // Extract the third element from each sub-array
      const thirdElements = arrays.map(arr => arr[2]).filter(Boolean); // Remove undefined values
      // Concatenate the extracted elements into a space-separated string
      console.log(thirdElements.join(" "));
      return thirdElements.join(" ");

    } else {
      /* const searchQuery = this.getUrlParameter('query') ?? '';
      console.log(searchQuery); */

      return this.searchQuery ?? '';

    }

  }

  searchTerms = this.processText(this.searchQuery ?? '');

}