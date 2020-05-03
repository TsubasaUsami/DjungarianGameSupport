import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  /** ローディングステータス */
  private loadingStatus = false;

  /**
   * コンストラクタ
   */
  constructor() { }

  /**
   * ローディングステータス取得
   */
  public getLoadingStatus(): boolean {
    return this.loadingStatus;
  }

  /**
   * ローディングステータス設定
   * @param status 状態
   */
  public setLoadingStatus(status: boolean) {
    this.loadingStatus = status;
  }
}
