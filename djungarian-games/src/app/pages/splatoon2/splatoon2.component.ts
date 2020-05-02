import { Component, OnInit } from '@angular/core';
import { PreviewModalService } from 'src/app/parts/modals/preview.service';

@Component({
  selector: 'app-splatoon2',
  templateUrl: './splatoon2.component.html',
  styleUrls: ['./splatoon2.component.css']
})
export class Splatoon2Component implements OnInit {

  constructor(
    private prevModal: PreviewModalService
  ) { }

  ngOnInit(): void {
  }

  async onClickTableRow() {
    const res = await this.prevModal.confirm('削除', '選択したデータを削除します。よろしいですか？', 'はい', 'いいえ');
  }

}
