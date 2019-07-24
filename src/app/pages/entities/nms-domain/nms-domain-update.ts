import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NmsDomain } from './nms-domain.model';
import { NmsDomainService } from './nms-domain.service';

@Component({
    selector: 'page-nms-domain-update',
    templateUrl: 'nms-domain-update.html'
})
export class NmsDomainUpdatePage implements OnInit {

    nmsDomain: NmsDomain;
    lastModifiedDate: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        name: [null, [Validators.required]],
        latitude: [null, []],
        longitude: [null, []],
        address: [null, []],
        domainEmail: [null, []],
        tag: [null, []],
        description: [null, []],
        notes: [null, []],
        domain: [null, []],
        selfAdmin: ['false', []],
        timeZone: [null, []],
        ipApi: [null, []],
        ipCancel: [null, []],
        loginExtension: [null, []],
        emailWelcome: [null, []],
        emailWelcomeContentType: [null, []],
        emailRenewPassword: [null, []],
        emailRenewPasswordContentType: [null, []],
        emailAccessToPatient: [null, []],
        emailAccessToPatientContentType: [null, []],
        sipEnabled: ['false', []],
        active: ['false', []],
        lastModifiedDate: [null, []],
        lastModifiedBy: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private nmsDomainService: NmsDomainService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.nmsDomain = response.data;
            this.isNew = this.nmsDomain.id === null || this.nmsDomain.id === undefined;
        });
    }

    updateForm(nmsDomain: NmsDomain) {
        this.form.patchValue({
            id: nmsDomain.id,
            name: nmsDomain.name,
            latitude: nmsDomain.latitude,
            longitude: nmsDomain.longitude,
            address: nmsDomain.address,
            domainEmail: nmsDomain.domainEmail,
            tag: nmsDomain.tag,
            description: nmsDomain.description,
            notes: nmsDomain.notes,
            domain: nmsDomain.domain,
            selfAdmin: nmsDomain.selfAdmin,
            timeZone: nmsDomain.timeZone,
            ipApi: nmsDomain.ipApi,
            ipCancel: nmsDomain.ipCancel,
            loginExtension: nmsDomain.loginExtension,
            emailWelcome: nmsDomain.emailWelcome,
            emailWelcomeContentType: nmsDomain.emailWelcomeContentType,
            emailRenewPassword: nmsDomain.emailRenewPassword,
            emailRenewPasswordContentType: nmsDomain.emailRenewPasswordContentType,
            emailAccessToPatient: nmsDomain.emailAccessToPatient,
            emailAccessToPatientContentType: nmsDomain.emailAccessToPatientContentType,
            sipEnabled: nmsDomain.sipEnabled,
            active: nmsDomain.active,
            lastModifiedDate: (this.isNew) ? new Date().toISOString() : nmsDomain.lastModifiedDate,
            lastModifiedBy: nmsDomain.lastModifiedBy,
        });
    }

    save() {
        this.isSaving = true;
        const nmsDomain = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.nmsDomainService.update(nmsDomain));
        } else {
            this.subscribeToSaveResponse(this.nmsDomainService.create(nmsDomain));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<NmsDomain>>) {
        result.subscribe((res: HttpResponse<NmsDomain>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `NmsDomain ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/nms-domain');
    }

    previousState() {
        window.history.back();
    }

    async onError(error) {
        this.isSaving = false;
        console.error(error);
        const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    private createFromForm(): NmsDomain {
        return {
            ...new NmsDomain(),
            id: this.form.get(['id']).value,
            name: this.form.get(['name']).value,
            latitude: this.form.get(['latitude']).value,
            longitude: this.form.get(['longitude']).value,
            address: this.form.get(['address']).value,
            domainEmail: this.form.get(['domainEmail']).value,
            tag: this.form.get(['tag']).value,
            description: this.form.get(['description']).value,
            notes: this.form.get(['notes']).value,
            domain: this.form.get(['domain']).value,
            selfAdmin: this.form.get(['selfAdmin']).value,
            timeZone: this.form.get(['timeZone']).value,
            ipApi: this.form.get(['ipApi']).value,
            ipCancel: this.form.get(['ipCancel']).value,
            loginExtension: this.form.get(['loginExtension']).value,
            emailWelcome: this.form.get(['emailWelcome']).value,
            emailWelcomeContentType: this.form.get(['emailWelcomeContentType']).value,
            emailRenewPassword: this.form.get(['emailRenewPassword']).value,
            emailRenewPasswordContentType: this.form.get(['emailRenewPasswordContentType']).value,
            emailAccessToPatient: this.form.get(['emailAccessToPatient']).value,
            emailAccessToPatientContentType: this.form.get(['emailAccessToPatientContentType']).value,
            sipEnabled: this.form.get(['sipEnabled']).value,
            active: this.form.get(['active']).value,
            lastModifiedDate: new Date(this.form.get(['lastModifiedDate']).value),
            lastModifiedBy: this.form.get(['lastModifiedBy']).value,
        };
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

}
