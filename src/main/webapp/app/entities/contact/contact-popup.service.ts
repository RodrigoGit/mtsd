import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Contact} from './contact.model';
import {ContactService} from './contact.service';

@Injectable()
export class ContactPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private contactService: ContactService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.contactService.find(id).subscribe((contact) => {
                    this.ngbModalRef = this.contactModalRef(component, contact);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.contactModalRef(component, new Contact());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    openNif(component: Component, nome?: string | any, nif?: string | any, address?: string | any, pc4?: string | any, pc3?: string | any, activity?: string | any, cae?: string | any, email?: string | any, phone?: string | any, website?: string | any, fax?: string | any, region?: string | any, county?: string | any, parish?: string | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => {
                const contact: Contact = new Contact();
                contact.nif = nif;
                contact.title = nome;
                contact.address = address;
                contact.postalCode4 = pc4;
                contact.postalCode3 = pc3;
                contact.activity = activity;
                contact.cae = cae;
                contact.email = email;
                contact.phone = phone;
                contact.website = website;
                contact.fax = fax;
                contact.region = region;
                contact.county = county;
                contact.parish = parish;
                this.ngbModalRef = this.contactModalRef(component, contact);
                //     this.ngbModalRef = this.contactModalRef(component, new Contact());
                resolve(this.ngbModalRef);
            }, 0);
        });
    }

    contactModalRef(component: Component, contact: Contact): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.contact = contact;
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
