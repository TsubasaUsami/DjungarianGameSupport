import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class CustomHttpInterceptor implements HttpInterceptor {

  /**
   * HTTPリクエストカウント
   */
  private httpReqCount = 0;

  /**
   * コンストラクタ
   */
  constructor(
    private injector: Injector
  ) { }

  /**
   * HTTPリクエストインターセプター
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // HTTPリクエストをキューイングする
    this.httpReqCount++;

    // ローディングを表示する
    const loadingService = this.injector.get(LoadingService);
    setTimeout(() => loadingService.setLoadingStatus(true));

    return next.handle(req)
      .pipe(
        finalize(() => {
          // HTTPリクエストが完了した場合、キューから減らす
          this.httpReqCount--;

          // 全てのHTTPリクエストが完了したらローディングを非表示にする
          if (this.httpReqCount === 0) {
            setTimeout(() => loadingService.setLoadingStatus(false));
          }
        })
      );
  }
}
