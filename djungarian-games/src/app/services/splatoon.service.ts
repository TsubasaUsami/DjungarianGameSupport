import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { SplatoonMatchInfoList } from '../models/splatoon/splatoon-match-info-list';

@Injectable()
export class SplatoonService {

  /** ベースURL */
  private readonly baseURL = '/common';
  constructor(
    private http: HttpClient
  ) {}

  params?: any | HttpParams | {
    [param: string]: string | string[];
  };

  /**
   * グループ情報取得APIコール用関数
   */
  public getMatchInfoList(matchType: string, target: string): Observable<SplatoonMatchInfoList> {
    return this.http.get<SplatoonMatchInfoList>(`${environment.webApiUrl}/${matchType}/${target}`);
  }
}
