import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Contact } from './contact.model';
import { ContactPopupService } from './contact-popup.service';
import { ContactService } from './contact.service';

@Component({
    selector: 'jhi-contact-dialog',
    templateUrl: './contact-dialog.component.html'
})
export class ContactDialogComponent implements OnInit {

    contact: Contact;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private contactService: ContactService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contact.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contactService.update(this.contact));
        } else {
            this.subscribeToSaveResponse(
                this.contactService.create(this.contact));
        }
    }

    private subscribeToSaveResponse(result: Observable<Contact>) {
        result.subscribe((res: Contact) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Contact) {
        this.eventManager.broadcast({ name: 'contactListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-contact-popup',
    template: ''
})
export class ContactPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactPopupService: ContactPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.contactPopupService
                    .open(ContactDialogComponent as Component, params['id']);
            } else {
                if (params['nome']) {
                    this.contactPopupService
                        .openNif(ContactDialogComponent as Component, params['nome'], params['nif'], params['address'], params['pc4'], params['pc3'], params['activity'], params['cae'], params['email'], params['phone'], params['website'], params['fax'], params['region'], params['county'], params['parish']);
                } else {
                    this.contactPopupService
                        .open(ContactDialogComponent as Component);
                }
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
