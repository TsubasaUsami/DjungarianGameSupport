import { Component, OnInit } from '@angular/core';
import { PreviewModalService } from 'src/app/parts/modals/preview.service';
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
  matchType = this.appConsts.REGULAR_PATH;
  matchTypeName = this.appConsts.REGULAR_NAME;
  target = this.appConsts.NOW_PATH;
  targetName = this.appConsts.NOW_NAME;

  constructor(
    private prevModal: PreviewModalService,
    private messageService: MessageService,
    private service: SplatoonService
  ) { }

  ngOnInit(): void {
    this.service.getMatchInfoList(this.appConsts.REGULAR_PATH, this.appConsts.NOW_PATH).subscribe((response) => {
      this.gridData = response.result;
      this.battleTypeLink = this.appConsts.BATTLE_TYPE[response.result[0].rule];
    },
    (err: any) => {
      this.messageService.showMessage(MessageId.MSG_ID_0001);
      console.log(err);
    });

  }

  onClickMatchBtn(type: string) {
    this.matchTypeName = type === this.appConsts.REGULAR_PATH ? this.appConsts.REGULAR_NAME : this.appConsts.GACHI_NAME;
    this.matchType = type;
    this.service.getMatchInfoList(type, this.target).subscribe((response) => {
      this.gridData = response.result;
      this.battleTypeLink = this.appConsts.BATTLE_TYPE[response.result[0].rule];
    },
    (err: any) => {
      this.messageService.showMessage(MessageId.MSG_ID_0001);
      console.log(err);
    });
  }

  onClickTargetBtn(target: string) {
    this.targetName = target === this.appConsts.NOW_PATH ? this.appConsts.NOW_NAME : this.appConsts.NEXT_NAME;
    this.target = target;
    this.service.getMatchInfoList(this.matchType, target).subscribe((response) => {
      this.gridData = response.result;
      this.battleTypeLink = this.appConsts.BATTLE_TYPE[response.result[0].rule];
    },
    (err: any) => {
      this.messageService.showMessage(MessageId.MSG_ID_0001);
      console.log(err);
    });
  }

}
