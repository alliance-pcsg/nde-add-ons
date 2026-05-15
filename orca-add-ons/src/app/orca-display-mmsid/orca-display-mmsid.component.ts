
import { selectFullDisplayRecord } from '../utils/fullDisplayRecordSelector';
import { Component, Input, Inject } from '@angular/core';
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
export class OrcaDisplayMmsidComponent {

    public params: { izSuffix: string; instCode: string;[key: string]: any };
    public izSuffix: string;
    public instCode: string;

    constructor(
        @Inject('MODULE_PARAMETERS') public moduleParameters?: any,
        private store?: Store,
        private http?: HttpClient
    ) {
        const defaults = {
            izSuffix: '1452',
            instCode: '01ALLIANCE_UW'
        };

        this.params = { ...defaults, ...(moduleParameters ?? {}) };
        this.izSuffix = this.params.izSuffix;
        this.instCode = this.params.instCode;

        if (this.moduleParameters) {
            console.log('Module parameters TestBottomComponent:', this.moduleParameters);
        }
    }

    @Input() parentCtrl!: any; // The ! tells TypeScript: "I know this will be initialized before it's used."

    selectedRecordId: string | undefined;

    izShow = true;
    nzShow = true;
    izLabel = 'Alma IZ Record No.';
    nzLabel = 'Alma NZ Record No.';


    izMmsid: string | null = null;
    nzMmsid: string | null = null;

    ngOnInit() {
        if (this.store) {
            this.store.select(selectFullDisplayRecord).subscribe((record) => {
                console.log('Record:', record);
                const pnx = record?.pnx?.control;
                console.log('PNX:', pnx);
                // Extract the source record ID from the record's PNX control field
                const recordId = record?.pnx?.control?.sourcerecordid;

                if (Array.isArray(recordId) && typeof recordId[0] === 'string') {
                    this.selectedRecordId = recordId[0];
                }
            });
        }

        console.log('Source Record ID:', this.selectedRecordId);
        /*         if (this.selectedRecordId && this.selectedRecordId.startsWith('99')) {
                    this.izShow = true;
                    this.nzShow = true;
                } */
        console.log('izsuffix', this.izSuffix);
        console.log('instcode', this.instCode);

        //srcid is nz mmsid, implies no iz mmsid        
        if (this.selectedRecordId && this.selectedRecordId.startsWith('99') && !this.selectedRecordId.endsWith(this.izSuffix)) {
            this.nzShow = true;
            this.izShow = false;
            this.nzMmsid = this.selectedRecordId ?? null;


            //srcid is iz mmsid, check sru for nz mmsid
        }
        if (this.selectedRecordId && this.selectedRecordId.startsWith('99') && this.selectedRecordId.endsWith(this.izSuffix)) {
            this.izShow = true;
            this.izMmsid = this.selectedRecordId ?? null;
            this.sruCall(this.selectedRecordId);
        }

        //neither iz nor nz mmsid
        if (!this.selectedRecordId || !this.selectedRecordId.startsWith('99')) {
            this.nzShow = false;
            this.izShow = false;
        }
    }

    private sruCall(mmsid: string): void {
        if (!this.http) {
            console.warn('HttpClient not available in federation mode');
            return;
        }
        const url = `https://na01.alma.exlibrisgroup.com/view/sru/${this.instCode}?version=1.2&operation=searchRetrieve&query=alma.mms_id=${mmsid}`;
        console.log('SRU URL:', url);
        this.http.get(url, { responseType: 'text' }).subscribe(response => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, 'text/xml');
            const fields = xmlDoc.getElementsByTagName('datafield');

            let found = false;
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                if (field.getAttribute('tag') === '035') {
                    const subfield = field.getElementsByTagName('subfield')[0]?.textContent;
                    if (subfield?.includes('(EXLNZ-01ALLIANCE_NETWORK)')) {
                        const pieces = subfield.split(')');
                        this.nzMmsid = pieces[1];
                        console.log('NZ MMSID:', this.nzMmsid);
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                this.nzShow = false;
            }
        });
    }
}