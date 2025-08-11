import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public tabs = [
    {name: 'New Visit', link: 'new', url: '/home/new' },
    {name: 'Owners', link: 'owners', url: '/home/owners' },
    {name: 'Wild Animals', link: 'wild-animals', url:'/home/wild-animals'  }
  ];

  public activeTab: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.activeTab = this.router.url;
  }

  navigate(tab: any): void {
    this.activeTab = tab.url;
    this.router.navigate([tab.url]);
  }
}
