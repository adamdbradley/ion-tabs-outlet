import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.css']
})
export class PageSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('PageSettingsComponent')
  }

}
