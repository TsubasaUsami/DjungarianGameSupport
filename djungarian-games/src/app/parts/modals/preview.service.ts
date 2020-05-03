import { Injectable, Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class PreviewModalService {
  constructor(public modalService: NgbModal) { }

  confirm(title: string, message: string, okCaption?: string, cancelCaption?: string): Promise<boolean> {
    const modalRef = this.modalService.open(MyModalPreviewContent);
    const component = modalRef.componentInstance as MyModalPreviewContent;
    if (component != null) {
      component.title = title;
      component.message = message;
      component.okCaption = okCaption || 'OK';
      component.cancelCaption = cancelCaption || 'Cancel';
    }

    return modalRef.result.then(result => {
      return true;  // はい を押したらこっち
    }, reason => {
      return false; // いいえ や x でダイアログを閉じたらこっち
    });
  }
}

@Component({
  template:
  `
    <div class="modal-header">
      <h4 class="modal-title">{{title}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('dissmiss')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p style="color: black">{{message}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('ok')">{{okCaption}}</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.dismiss('cancel')">{{cancelCaption}}</button>
    </div>
  `
})
// tslint:disable-next-line   <-- tslint さんが「コンポーネントならクラス名に Component を付けろ」と怒り心頭なので黙らせる
export class MyModalPreviewContent {

  @Input() title: string;
  @Input() message: string;
  @Input() okCaption = 'OK';
  @Input() cancelCaption = 'Cancel';

  constructor(public activeModal: NgbActiveModal) { }
}
