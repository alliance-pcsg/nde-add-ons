
import { selectFullDisplayRecord } from '../utils/fullDisplayRecordSelector';
import { Component, Input, Inject, Optional, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';



@Component({
    selector: 'orca-display-mmsid',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './orca-display-mmsid.component.html',
    styleUrls: ['./orca-display-mmsid.component.scss']
})
export class OrcaDisplayMmsidComponent implements OnInit, OnDestroy {

    private recordSubscription?: Subscription;

    // Typed to include the four required params plus any extras passed in via MODULE_PARAMETERS
    public params: { izSuffix: string; instCode: string; sruHost: string; nzCode: string; [key: string]: any };
    public izSuffix: string;   // Numeric suffix that identifies an IZ MMS ID (e.g. '1452' for UW)
    public instCode: string;   // Alma institution code used in the SRU query (e.g. '01ALLIANCE_UW')
    public sruHost: string;    // Alma SRU hostname for the institution's region (e.g. 'na01.alma.exlibrisgroup.com')
    public nzCode: string;     // Network zone ISIL code found in MARC 035 subfields (e.g. 'EXLNZ-01ALLIANCE_NETWORK')

    constructor(
        // MODULE_PARAMETERS is injected by the Primo NDE host with the JSON config supplied by the institution
        @Inject('MODULE_PARAMETERS') public moduleParameters?: any,
        // Store and HttpClient are optional — the component degrades gracefully if either is unavailable
        @Optional() private store: Store | null = null,
        @Optional() private http: HttpClient | null = null
    ) {
        // All params default to empty string; the component hides itself until all four are configured
        const defaults = {
            izSuffix: '',
            instCode: '',
            sruHost: '',
            nzCode: ''
        };

        // Merge institution-supplied config over the defaults
        this.params = { ...defaults, ...(moduleParameters ?? {}) };
        this.izSuffix = this.params.izSuffix;
        this.instCode = this.params.instCode;
        this.sruHost = this.params.sruHost;
        this.nzCode = this.params.nzCode;
    }

    @Input() parentCtrl!: any;

    selectedRecordId: string | undefined;

    // Both flags start true; the subscribe callback sets them based on the record ID
    izShow = true;
    nzShow = true;
    izLabel = 'Alma IZ Record No.';
    nzLabel = 'Alma NZ Record No.';

    izMmsid: string | null = null;
    nzMmsid: string | null = null;

    ngOnInit() {
        if (this.store) {
            // Subscribe to the full-display record from the NgRx store.
            // All branching logic lives inside the callback so it runs after the store emits,
            // not synchronously after subscribe() returns.
            this.recordSubscription = this.store.select(selectFullDisplayRecord).subscribe((record) => {

                // Hide everything if required config params are missing
                if (!this.izSuffix || !this.instCode || !this.sruHost || !this.nzCode) {
                    this.izShow = false;
                    this.nzShow = false;
                    return;
                }

                // sourcerecordid is an array in the PNX control block; grab the first element
                const recordId = record?.pnx?.control?.sourcerecordid;

                if (Array.isArray(recordId) && typeof recordId[0] === 'string') {
                    this.selectedRecordId = recordId[0];
                }

                // NZ MMS IDs start with '99' but do NOT end with the IZ suffix
                if (this.selectedRecordId && this.selectedRecordId.startsWith('99') && !this.selectedRecordId.endsWith(this.izSuffix)) {
                    this.nzShow = true;
                    this.izShow = false;
                    this.nzMmsid = this.selectedRecordId;

                // IZ MMS IDs start with '99' and DO end with the IZ suffix;
                // make an SRU call to look up the corresponding NZ MMS ID
                } else if (this.selectedRecordId && this.selectedRecordId.startsWith('99') && this.selectedRecordId.endsWith(this.izSuffix)) {
                    this.izShow = true;
                    this.izMmsid = this.selectedRecordId;
                    this.sruCall(this.selectedRecordId);

                // Record ID doesn't match either pattern — hide both rows
                } else {
                    this.nzShow = false;
                    this.izShow = false;
                }
            });
        }
    }

    ngOnDestroy() {
        // Prevent memory leaks when the user navigates between records
        this.recordSubscription?.unsubscribe();
    }

    // Queries the Alma SRU endpoint to find the NZ MMS ID that corresponds to a given IZ MMS ID.
    // Searches MARC 035 fields for a subfield matching the configured nzCode prefix,
    // then extracts the numeric MMS ID that follows it.
    private sruCall(mmsid: string): void {
        if (!this.http) {
            console.warn('HttpClient not available in federation mode');
            return;
        }

        const url = `https://${this.sruHost}/view/sru/${this.instCode}?version=1.2&operation=searchRetrieve&query=alma.mms_id=${mmsid}`;

        this.http.get(url, { responseType: 'text' }).subscribe({
            next: response => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response, 'text/xml');
                const fields = xmlDoc.getElementsByTagName('datafield');

                // Build a regex anchored on the nzCode prefix to safely extract the MMS ID.
                // The nzCode is escaped so special regex characters in it don't break the pattern.
                const nzPattern = new RegExp(`^\\(${this.nzCode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)(\\d+)$`);

                let found = false;
                for (let i = 0; i < fields.length; i++) {
                    const field = fields[i];
                    if (field.getAttribute('tag') === '035') {
                        const subfield = field.getElementsByTagName('subfield')[0]?.textContent;
                        const match = subfield?.match(nzPattern);
                        if (match) {
                            // match[1] is the capture group — the digits after the nzCode prefix
                            this.nzMmsid = match[1];
                            found = true;
                            break;
                        }
                    }
                }

                // No matching 035 field found — hide the NZ row
                if (!found) {
                    this.nzShow = false;
                }
            },
            // On HTTP failure, hide the NZ row rather than showing an empty cell
            error: () => {
                this.nzShow = false;
            }
        });
    }
}
