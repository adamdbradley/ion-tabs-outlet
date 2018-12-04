import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-account-detail',
  templateUrl: './page-account-detail.component.html',
  styleUrls: ['./page-account-detail.component.css']
})
export class PageAccountDetailComponent implements OnInit {

  id: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
