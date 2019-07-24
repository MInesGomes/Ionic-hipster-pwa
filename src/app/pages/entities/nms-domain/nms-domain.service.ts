import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { NmsDomain } from './nms-domain.model';

@Injectable({ providedIn: 'root'})
export class NmsDomainService {
    private resourceUrl = ApiService.API_URL + '/nms-domains';

    constructor(protected http: HttpClient) { }

    create(nmsDomain: NmsDomain): Observable<HttpResponse<NmsDomain>> {
        return this.http.post<NmsDomain>(this.resourceUrl, nmsDomain, { observe: 'response'});
    }

    update(nmsDomain: NmsDomain): Observable<HttpResponse<NmsDomain>> {
        return this.http.put(this.resourceUrl, nmsDomain, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<NmsDomain>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<NmsDomain[]>> {
        const options = createRequestOption(req);
        return this.http.get<NmsDomain[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
