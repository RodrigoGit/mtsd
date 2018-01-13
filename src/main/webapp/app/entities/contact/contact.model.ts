import { BaseEntity } from './../../shared';

export class Contact implements BaseEntity {
    constructor(
        public id?: number,
        public nif?: string,
        public title?: string,
        public address?: string,
        public postalCode4?: string,
        public postalCode3?: string,
        public activity?: string,
        public cae?: string,
        public email?: string,
        public phone?: string,
        public website?: string,
        public fax?: string,
        public region?: string,
        public county?: string,
        public parish?: string,
    ) {
    }
}
