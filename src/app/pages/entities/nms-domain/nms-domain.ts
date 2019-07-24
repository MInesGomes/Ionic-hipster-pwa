import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { JhiDataUtils, JhiParseLinks } from 'ng-jhipster';
import { NmsDomain } from './nms-domain.model';
import { NmsDomainService } from './nms-domain.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'page-nms-domain',
    templateUrl: 'nms-domain.html'
})
export class NmsDomainPage {
    nmsDomains: NmsDomain[];

    parseLinks: JhiParseLinks;
    currentAccount: any;
    itemsPerPage: number;
    links: any;
    page: any;
    // predicate: any;
    // reverse: any;
    totalItems: number;
    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private nmsDomainService: NmsDomainService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.nmsDomains = [];
        this.itemsPerPage = environment.ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        // this.predicate = 'id';
        // this.reverse = true;
    }


    // constructor(
    //     protected nmsDomainService: NmsDomainService,
    //     protected jhiAlertService: JhiAlertService,
    //     protected dataUtils: JhiDataUtils,
    //     protected eventManager: JhiEventManager,
    //     protected parseLinks: JhiParseLinks,
    //     protected accountService: AccountService
    //   ) {
    //     this.nmsDomains = [];
    //     this.itemsPerPage = ITEMS_PER_PAGE;
    //     this.page = 0;
    //     this.links = {
    //       last: 0
    //     };
    //     this.predicate = 'id';
    //     this.reverse = true;
    //   }

    ionViewWillEnter() {
        this.loadAll();
    }

    // async loadAll(refresher?) {
    //     this.nmsDomainService.query().pipe(
    //         filter((res: HttpResponse<NmsDomain[]>) => res.ok),
    //         map((res: HttpResponse<NmsDomain[]>) => res.body)
    //     )
    //     .subscribe(
    //         (response: NmsDomain[]) => {
    //             this.nmsDomains = response;
    //             if (typeof(refresher) !== 'undefined') {
    //                 setTimeout(() => {
    //                     refresher.target.complete();
    //                 }, 750);
    //             }
    //         },
    //         async (error) => {
    //             console.error(error);
    //             const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
    //             toast.present();
    //         });
    // }


    loadAll(predicate = 'id', reverse=true) {
        this.nmsDomainService
            .query({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort(predicate, reverse)
            })
            .subscribe(
                (res: HttpResponse<NmsDomain[]>) => this.paginateNmsDomains(res.body, res.headers),
                (res: HttpErrorResponse) => console.log('LoadError:', res.message)
            );
    }


    sort(predicate, reverse) {
        const result = [predicate + ',' + (reverse ? 'asc' : 'desc')];
        if (predicate !== 'id') {
            result.push('id');
        }
        console.log(result);
        return result;
    }

    reset() {
        this.page = 0;
        this.nmsDomains = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    protected paginateNmsDomains(data: NmsDomain[], headers: HttpHeaders) {
        // console.log(data);
        this.nmsDomains = data;
        // this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        // for (let i = 0; i < data.length; i++) {
        //     this.nmsDomains.push(data[i]);
        // }
    }

    // ==

    trackId(index: number, item: NmsDomain) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/nms-domain/new');
    }

    edit(nmsDomain: NmsDomain) {
        console.log('Edit', nmsDomain.id);
        this.navController.navigateForward('/tabs/entities/nms-domain/' + nmsDomain.id + '/edit');
        // item.close();
    }

    inactive() {
        console.log('setInactive');
    }
    // async delete(nmsDomain) {
    //     this.nmsDomainService.delete(nmsDomain.id).subscribe(async () => {
    //         const toast = await this.toastCtrl.create(
    //             { message: 'NmsDomain deleted successfully.', duration: 3000, position: 'middle' });
    //         toast.present();
    //         this.loadAll();
    //     }, (error) => console.error(error));
    // }

    view(nmsDomain: NmsDomain) {
        this.navController.navigateForward('/tabs/entities/nms-domain/' + nmsDomain.id + '/view');
    }
}
