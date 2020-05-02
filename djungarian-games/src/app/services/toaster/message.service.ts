import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MessageId, MessageList } from 'src/app/constants/message.constant';

@Injectable({ providedIn: 'root' })
export class MessageService {

  /** エラー・警告メッセージ用の表示設定(カードクリックで消去)  */
  private readonly ERROR_WARN_MSG_CONF = {
    disableTimeOut: true,
    tapToDismiss: true
  };

  /**
   * コンストラクタ
   */
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    // ブラウザから言語取得
    const currentLang =  this.translate.getBrowserLang();
    // 使用する言語を設定
    this.translate.setDefaultLang(currentLang);
    this.translate.use(currentLang);
  }

  /**
   * メッセージ表示
   * @param msgId メッセージID
   * @param params パラメータ
   */
  showMessage(msgId: MessageId, params: any = {}) {
    const msg = MessageList.find((message) => message.id === msgId);
    if (msg.level === 'error' || msg.level === 'warning') {
      this.toastr[msg.level].call(this.toastr, this.translate.instant(msg.text, params), '', this.ERROR_WARN_MSG_CONF);
    } else {
      this.toastr[msg.level].call(this.toastr, this.translate.instant(msg.text, params));
    }
  }

  /**
   * 成功メッセージ表示(バックエンドのレスポンス用)
   * @param message メッセージ
   */
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  /**
   * エラーメッセージ表示(バックエンドのレスポンス用)
   * @param message メッセージ
   */
  showError(message: string) {
    this.toastr.error(message, '', this.ERROR_WARN_MSG_CONF);
  }

  /**
   * 警告メッセージ表示(バックエンドのレスポンス用)
   * @param message メッセージ
   */
  showWarning(message: string) {
    this.toastr.warning(message, '', this.ERROR_WARN_MSG_CONF);
  }

  /**
   * エラーレスポンスメッセージ表示
   * @param response エラーレスポンス
   */
  showErrorResponse(response: any) {
    // エラーオブジェクト内のメッセージを表示
    let message = '';
    if (response.error) {
      if (response.error.details) {
        // エラーオブジェクトメッセージを全て表示
        message = response.error.details.map((detail) => detail.message).join('<br>');
      } else {
        // 共通エラーオブジェクトメッセージ表示
        message = response.error.message || '';
        // ブロブダウンロードエラーの場合ファイルダウンロードエラーメッセージを表示
        if (response.error instanceof Blob) {
          message = 'ファイルを取得できません。';
        }
      }
    } else {
      // エラーオブジェクトがない場合はレスポンスエラーメッセージ表示
      message = response.message || '';
    }
    message = message.replace(/\r?\n/g, '<br>');
    this.toastr.error(message || '例外エラーが発生しました。', '', this.ERROR_WARN_MSG_CONF);
  }

  /**
   * 警告メッセージリストをメッセージ表示します。
   * @param warnMsgList 警告メッセージリスト
   */
  showWarnMsgList(warnMsgList: any[]) {
    warnMsgList.forEach((msg) => {
      msg = msg.replace(/\r?\n/g, '<br>');
      this.showWarning(msg);
    });
  }

}
