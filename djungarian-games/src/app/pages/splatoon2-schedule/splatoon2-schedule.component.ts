import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/services/toaster/message.service';
import { SplatoonService } from 'src/app/services/splatoon.service';
import { MessageId } from 'src/app/constants/message.constant';
import { MatchInfo } from 'src/app/models/splatoon/match-info';

@Component({
  selector: 'app-splatoon2-schedule',
  templateUrl: './splatoon2-schedule.component.html',
  styleUrls: ['./splatoon2-schedule.component.css']
})
export class Splatoon2ScheduleComponent implements OnInit {
  public isCollapsedReg: boolean; // アコーディオン用
  public isCollapsedGac = true; // アコーディオン用
  public isCollapsedLea = true; // アコーディオン用
  public gachiList: MatchInfo[];
  public regularList: MatchInfo[];
  public leagueList: MatchInfo[];
  public startDate: Date;
  public endDate: Date;
  public nowDate = new Date();

  constructor(
    private location: Location,
    private messageService: MessageService,
    private service: SplatoonService
  ) { }

  /**
   * 初期処理
   */
  ngOnInit(): void {
    // APIをコールしてデータを取得する。
    this.service.getMatchScheduleList().subscribe((response) => {
      console.log(response);
      this.regularList = response.result.regular;
      this.gachiList = response.result.gachi;
      this.leagueList = response.result.league;
      this.startDate = response.result.regular[0].start;
      this.endDate = response.result.regular.slice(-1)[0].end;
    },
    (err: any) => {
      // エラー時はメッセージを表示
      this.messageService.showMessage(MessageId.MSG_ID_0001);
      console.log(err);
    });

  }

  goBack(): void {
    this.location.back();
  }

  onTime(item: MatchInfo): boolean {
    const startDate = new Date(item.start + '+09:00');
    const endDate = new Date(item.end + '+09:00');
    if (startDate <= this.nowDate && this.nowDate <= endDate) {
      return true;
    } else {
      return false;
    }
  }
}
