import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiUrl = "/api/tesws-chat";

  jsonHeaders: HttpHeaders = (new HttpHeaders()).append('Content-Type','application/json');
  constructor(private http: HttpClient) { }
  sendLpcoCharMessage(body) {
    return this.http.post(this.apiUrl + `/chat`, body,{headers: this.jsonHeaders});
  }
  getChatsListByDeclarationRef(appRef) {
    const params = (new HttpParams()).append('reference_tin', appRef.reference_tin)
      .append('tansad_yy', appRef.tansad_yy)
      .append('application_id', appRef.application_id)
      .append('tansad_serial_no', appRef.tansad_serial_no);

    return this.http.get(this.apiUrl + `/chat`, { params,headers: this.jsonHeaders }).pipe(map((data:any) => {
      return data.sort((a,b) => (a.first_register_date > b.first_register_date) ? 1 : ((b.first_register_date > a.first_register_date) ? -1 : 0));
    }));
  }
}
