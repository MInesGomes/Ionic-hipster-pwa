import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { NmsDomain } from './nms-domain.model';
import { NmsDomainService } from './nms-domain.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-nms-domain-detail',
    templateUrl: 'nms-domain-detail.html'
})
export class NmsDomainDetailPage implements OnInit {
    nmsDomain: NmsDomain;

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private nmsDomainService: NmsDomainService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.nmsDomain = response.data;
        });
    }

    open(item: NmsDomain) {
        this.navController.navigateForward('/tabs/entities/nms-domain/' + item.id + '/edit');
    }

    async deleteModal(item: NmsDomain) {
        const alert = await this.alertController.create({
            header: 'Confirm the deletion?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Delete',
                    handler: () => {
                        this.nmsDomainService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/nms-domain');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

}
