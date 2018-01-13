import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {Contact} from './contact.model';
import {ContactService} from './contact.service';
import {ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../shared';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
    selector: 'jhi-contact',
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit, OnDestroy {

    currentAccount: any;
    contacts: Contact[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(private contactService: ContactService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private eventManager: JhiEventManager) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.contactService.search({
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
                (res: ResponseWrapper) => this.onError(res.json)
            );
            return;
        }
        this.contactService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/contact'], {
            queryParams:
                {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
                }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/contact', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate(['/contact', {
            search: this.currentSearch,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    loadNif(f: NgForm) {

        alert('1');
        let title: String = '';
        let nif: String = '';
        let address: String = '';
        let pc4: String = '';
        let pc3: String = '';
        let activity: String = '';
        let cae: String = '';
        let email: String = '';
        let phone: String = '';
        let website: String = '';
        let fax: String = '';
        let region: String = '';
        let county: String = '';
        let parish: String = '';
        this.contactService.nif(f.form.controls.nif.value).subscribe(
            (data) => {

                try {
                    console.log(data.json());

                    try {
                        console.log('Nome:' + data.json().records[f.form.controls.nif.value].title);
                        title = data.json().records[f.form.controls.nif.value].title.toString();
                    } catch (e) {
                        title = '';
                    }

                    try {
                        console.log('Nif:' + data.json().records[f.form.controls.nif.value].nif);
                        nif = data.json().records[f.form.controls.nif.value].nif.toString();
                    } catch (e) {
                        nif = '';
                    }

                    try {
                        console.log('Adress:' + data.json().records[f.form.controls.nif.value].address);
                        address = data.json().records[f.form.controls.nif.value].address.toString();
                    } catch (e) {
                        address = '';
                    }

                    try {
                        console.log('Pc4:' + data.json().records[f.form.controls.nif.value].pc4);
                        pc4 = data.json().records[f.form.controls.nif.value].pc4.toString();
                    } catch (e) {
                        pc4 = '';
                    }
                    try {
                        console.log('Pc3:' + data.json().records[f.form.controls.nif.value].pc3);
                        pc3 = data.json().records[f.form.controls.nif.value].pc3.toString();
                    } catch (e) {
                        pc3 = '';
                    }

                    try {
                        console.log('Activity:' + data.json().records[f.form.controls.nif.value].activity);
                        activity = data.json().records[f.form.controls.nif.value].activity.toString();
                    } catch (e) {
                        activity = '';
                    }
                    try {
                        console.log('cae:' + data.json().records[f.form.controls.nif.value].cae.toString());
                        cae = data.json().records[f.form.controls.nif.value].cae.toString();
                    } catch (e) {
                        cae = '';
                    }

                    try {
                        console.log('Email:' + data.json().records[f.form.controls.nif.value].contacts.email);
                        email = data.json().records[f.form.controls.nif.value].contacts.email.toString();
                    } catch (e) {
                        email = '';
                    }
                    try {
                        console.log('Phone:' + data.json().records[f.form.controls.nif.value].contacts.phone);
                        phone = data.json().records[f.form.controls.nif.value].contacts.phone.toString();
                    } catch (e) {
                        phone = '';
                    }
                    try {
                        console.log('website:' + data.json().records[f.form.controls.nif.value].contacts.website);
                        website = data.json().records[f.form.controls.nif.value].contacts.website.toString();
                    } catch (e) {
                        website = '';
                    }
                    try {
                        console.log('Fax:' + data.json().records[f.form.controls.nif.value].contacts.fax);
                        fax = data.json().records[f.form.controls.nif.value].contacts.fax.toString();
                    } catch (e) {
                        fax = '';
                    }
                    try {
                        console.log('Region:' + data.json().records[f.form.controls.nif.value].geo.region);
                        region = data.json().records[f.form.controls.nif.value].geo.region.toString();
                    } catch (e) {
                        region = '';
                    }
                    try {
                        console.log('county:' + data.json().records[f.form.controls.nif.value].geo.county);
                        county = data.json().records[f.form.controls.nif.value].geo.county.toString();
                    } catch (e) {
                        county = '';
                    }
                    try {
                        console.log('county:' + data.json().records[f.form.controls.nif.value].geo.parish);
                        parish = data.json().records[f.form.controls.nif.value].geo.parish.toString();
                    } catch (e) {
                        parish = '';
                    }


                    console.log('fim1--------');
                    console.log('title');
                    console.log(title);
                    console.log('nif');
                    console.log(nif);
                    console.log('address');
                    console.log(address);
                    console.log('pc4');
                    console.log(pc4);
                    console.log('pc3');
                    console.log(pc3);
                    console.log('activity');
                    console.log(activity);
                    console.log('cae');
                    console.log(cae);
                    console.log('email');
                    console.log(email);
                    console.log('phone');
                    console.log(phone);
                    console.log('website');
                    console.log(website);
                    console.log('fax');
                    console.log(fax);
                    console.log('region');
                    console.log(region);
                    console.log('county');
                    console.log(county);
                    console.log('parish');
                    console.log(parish);
                   this.router.navigate([{outlets: {popup: ['contact-new', title, nif, address, pc4, pc3, activity, cae, email, phone, website, fax, region, county, parish]}}]);
                    console.log('fim2--------');
                } catch (e) {
                    this.router.navigate([{outlets: {popup: ['contact-new']}}]);
                }


            }
        );

    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInContacts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Contact) {
        return item.id;
    }

    registerChangeInContacts() {
        this.eventSubscriber = this.eventManager.subscribe('contactListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.contacts = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
