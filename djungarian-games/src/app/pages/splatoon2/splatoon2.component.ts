import { Component, OnInit } from '@angular/core';
import { SplatoonService } from 'src/app/services/splatoon.service';
import { AppConsts } from 'src/app/constants/app-consts';
import { MatchInfo } from 'src/app/models/splatoon/match-info';
import { MessageService } from 'src/app/services/toaster/message.service';
import { MessageId } from 'src/app/constants/message.constant';

@Component({
  selector: 'app-splatoon2',
  templateUrl: './splatoon2.component.html',
  styleUrls: ['./splatoon2.component.css']
})
export class Splatoon2Component implements OnInit {
  appConsts = AppConsts;
  battleTypeLink: string;
  gridData: MatchInfo[] = [];
  matchConfig = {
    path: this.appConsts.REGULAR_PATH,
    value: this.appConsts.REGULAR_NAME
  };
  target = this.appConsts.NOW_PATH;
  targetName = this.appConsts.NOW_NAME;

  constructor(
    private messageService: MessageService,
    private service: SplatoonService
  ) { }

  /**
   * 初期処理
   */
  ngOnInit(): void {
    // APIをコールしてデータを取得する。
    this.service.getMatchInfoList(this.appConsts.REGULAR_PATH, this.appConsts.NOW_PATH).subscribe((response) => {
      this.gridData = response.result;
      this.battleTypeLink = this.appConsts.BATTLE_TYPE[response.result[0].rule];
    },
    (err: any) => {
      // エラー時はメッセージを表示
      this.messageService.showMessage(MessageId.MSG_ID_0001);
      console.log(err);
    });

  }

  /**
   * マッチリスト選択時処理
   * @param type マッチ種別
   */
  onClickMatchLst() {
    // 表示対象は現在に戻す
    this.target = this.appConsts.NOW_PATH;
    this.targetName = this.appConsts.NOW_NAME;

    // APIをコールしてデータを取得する。
    this.service.getMatchInfoList(this.matchConfig.path, this.target).subscribe((response) => {
      this.matchConfig.value = this.appConsts.MATCH_TYPE_LIST.filter(x => x.path === this.matchConfig.path)[0].value;
      this.gridData = response.result;
      this.battleTypeLink = this.appConsts.BATTLE_TYPE[response.result[0].rule];
    },
    (err: any) => {
      // エラー時はメッセージを表示
      this.messageService.showMessage(MessageId.MSG_ID_0001);
      console.log(err);
    });
  }

  /**
   * 表示時間帯選択時処理
   * @param target 時間帯
   */
  onClickTargetBtn(target: string) {
    // 表示時間帯を引数に応じて変更
    this.targetName = target === this.appConsts.NOW_PATH ? this.appConsts.NOW_NAME : this.appConsts.NEXT_NAME;
    this.target = target;

    // APIをコールしてデータを取得する。
    this.service.getMatchInfoList(this.matchConfig.path, target).subscribe((response) => {
      this.gridData = response.result;
      this.battleTypeLink = this.appConsts.BATTLE_TYPE[response.result[0].rule];
    },
    (err: any) => {
      // エラー時はメッセージを表示
      this.messageService.showMessage(MessageId.MSG_ID_0001);
      console.log(err);
    });
  }

}
