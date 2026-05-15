import { Component, Input, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'orca-external-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orca-external-search.component.html',
  styleUrl: './orca-external-search.component.scss',
})
export class OrcaExternalSearchComponent implements OnInit {

  // Injected by the Primo NDE host — gives this component access to the parent slot's context
  @Input() hostComponent!: any;

  // Merged result of defaults and institution-supplied MODULE_PARAMETERS config
  public params: any;

  // worldcatString should be a full URL prefix including scheme, e.g.
  // "https://uwashington.on.worldcat.org/search?databaseList=&queryString="
  // The search terms are appended directly, so the prefix must end with the query parameter
  public worldcatString: string;
  public worldcatBrandName: string;    // Display name shown in the link text, e.g. "UW WorldCat"
  public worldcatLogoUrl: string;      // URL of the WorldCat logo image
  public googleScholarLogoUrl: string; // URL of the Google Scholar logo image

  constructor(
    // MODULE_PARAMETERS is provided by the Primo NDE host with the JSON config supplied by the institution.
    // Defaults below are used when a parameter is absent from the config.
    @Inject('MODULE_PARAMETERS') public moduleParameters: any
  ) {
    this.params = Object.assign({
      worldcatString: "https://search.worldcat.org/search?q=",
      worldcatBrandName: "WorldCat",
      worldcatLogoUrl: "https://search.worldcat.org/favicons/favicon-32x32.png",
      googleScholarLogoUrl: "https://scholar.google.com/favicon.ico"
    }, moduleParameters);

    this.worldcatString = this.params.worldcatString;
    this.worldcatBrandName = this.params.worldcatBrandName;
    this.worldcatLogoUrl = this.params.worldcatLogoUrl;
    this.googleScholarLogoUrl = this.params.googleScholarLogoUrl;
  }

  // Initialized to null/empty; computed in ngOnInit once the URL is accessible
  searchMode: string | null = null;
  searchQuery: string | null = null;
  searchTerms: string = '';

  ngOnInit() {
    // Read the current search mode and query from the Primo page URL.
    // These are computed here (not in field initializers) to ensure the DOM
    // and DI context are fully established before window.location is accessed.
    this.searchMode = this.getUrlParameter('mode');
    this.searchQuery = this.getUrlParameter('query');

    // processText extracts the human-readable search terms from the raw query string,
    // handling both simple and advanced search modes.
    // encodeURIComponent ensures special characters (spaces, &, #, etc.) don't break the URLs.
    this.searchTerms = encodeURIComponent(this.processText(this.searchQuery ?? ''));
  }

  // Reads a single query parameter from the current page URL.
  getUrlParameter(parameterName: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
  }

  // Extracts a clean, human-readable search string from the Primo query parameter.
  //
  // Simple mode: the query parameter is already a plain search string, returned as-is.
  //
  // Advanced mode: Primo encodes each search field as a semicolon-delimited segment,
  // where each segment is a comma-delimited triple of [index, operator, term].
  // For example: "title,contains,angular;author,contains,ward"
  // This method extracts the third element (the term) from each segment and joins
  // them with spaces to produce a single search string suitable for external links.
  processText(input: string): string {
    if (this.searchMode === 'advanced') {
      const arrays = input.split(";").map(segment => segment.split(","));
      const thirdElements = arrays.map(arr => arr[2]).filter(Boolean);
      return thirdElements.join(" ");
    } else {
      return this.searchQuery ?? '';
    }
  }

}
