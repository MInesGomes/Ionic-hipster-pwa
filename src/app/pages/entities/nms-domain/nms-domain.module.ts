import { NgModule, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from '../../../services/auth/user-route-access.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

import { NmsDomainPage } from './nms-domain';
import { NmsDomainUpdatePage } from './nms-domain-update';
import { NmsDomain, NmsDomainService, NmsDomainDetailPage } from '.';
import { ComponentsModule } from 'src/components/components.module';

@Injectable({ providedIn: 'root' })
export class NmsDomainResolve implements Resolve<NmsDomain> {
  constructor(private service: NmsDomainService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NmsDomain> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NmsDomain>) => response.ok),
        map((nmsDomain: HttpResponse<NmsDomain>) => nmsDomain.body)
      );
    }
    return of(new NmsDomain());
  }
}

const routes: Routes = [
    {
      path: '',
      component: NmsDomainPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: NmsDomainUpdatePage,
      resolve: {
        data: NmsDomainResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: NmsDomainDetailPage,
      resolve: {
        data: NmsDomainResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: NmsDomainUpdatePage,
      resolve: {
        data: NmsDomainResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        NmsDomainPage,
        NmsDomainUpdatePage,
        NmsDomainDetailPage
    ],
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslateModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ]
})
export class NmsDomainPageModule {
}
