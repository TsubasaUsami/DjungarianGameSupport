import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isDisplay: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onClickDropdown() {
    this.isDisplay = this.isDisplay ? false : true;
  }

}
