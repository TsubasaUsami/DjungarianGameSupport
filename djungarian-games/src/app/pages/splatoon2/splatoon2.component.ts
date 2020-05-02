import { Component, OnInit } from '@angular/core';
import { PreviewModalService } from 'src/app/parts/modals/preview.service';
import { SplatoonService } from 'src/app/services/splatoon.service';
import { SplatoonMatchInfo } from 'src/app/models/splatoon/splatoon-match-info';

@Component({
  selector: 'app-splatoon2',
  templateUrl: './splatoon2.component.html',
  styleUrls: ['./splatoon2.component.css']
})
export class Splatoon2Component implements OnInit {
  gridData: SplatoonMatchInfo[];

  constructor(
    private prevModal: PreviewModalService,
    private service: SplatoonService
  ) { }

  ngOnInit(): void {
    this.service.getMatchInfoList('regular', 'now').subscribe((response) => {
      this.gridData = response.result;
      console.log(response.result[0].start);
    });
  }

  async onClickTableRow() {
    const res = await this.prevModal.confirm('削除', '選択したデータを削除します。よろしいですか？', 'はい', 'いいえ');
  }

}
