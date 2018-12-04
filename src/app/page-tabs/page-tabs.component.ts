import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-tabs',
  templateUrl: './page-tabs.component.html',
  styleUrls: ['./page-tabs.component.css']
})
export class PageTabsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('PageTabsComponent')
  }

  alert(msg: string) {
    alert(msg);
  }

}
