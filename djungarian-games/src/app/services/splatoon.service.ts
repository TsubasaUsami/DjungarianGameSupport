import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { MatchInfoList } from '../models/splatoon/match-info-list';
import { ScheduleInfo } from '../models/splatoon/schedule-info';

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
   * マッチ情報取得APIコール用関数
   */
  public getMatchInfoList(matchType: string, target: string): Observable<MatchInfoList> {
    return this.http.get<MatchInfoList>(`${environment.webApiUrlSpl}/${matchType}/${target}`);
  }

  /**
   * 現在～24時間後のマッチ情報取得APIコール用関数
   */
  public getMatchScheduleList(): Observable<ScheduleInfo> {
    return this.http.get<ScheduleInfo>(`${environment.webApiUrlSpl}/schedule`);
  }
}
