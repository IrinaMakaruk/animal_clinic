import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-visit-form',
  templateUrl: './new-visit-form.component.html'
})
export class NewVisitFormComponent implements OnInit {
  public minDate: Date;
  public maxDate: Date;

  constructor() { }

  ngOnInit(): void {
    this.setMinMaxDates();
  }

  private setMinMaxDates(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 30, 0, 1);
    this.maxDate = new Date();
  }
}
