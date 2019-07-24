import { BaseEntity } from 'src/model/base-entity';

export class NmsDomain implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public latitude?: string,
        public longitude?: string,
        public address?: string,
        public domainEmail?: string,
        public tag?: string,
        public description?: string,
        public notes?: string,
        public domain?: string,
        public selfAdmin?: boolean,
        public timeZone?: string,
        public ipApi?: string,
        public ipCancel?: string,
        public loginExtension?: string,
        public emailWelcomeContentType?: string,
        public emailWelcome?: any,
        public emailRenewPasswordContentType?: string,
        public emailRenewPassword?: any,
        public emailAccessToPatientContentType?: string,
        public emailAccessToPatient?: any,
        public sipEnabled?: boolean,
        public active?: boolean,
        public lastModifiedDate?: any,
        public lastModifiedBy?: string,
    ) {
        this.selfAdmin = false;
        this.sipEnabled = false;
        this.active = false;
    }
}
