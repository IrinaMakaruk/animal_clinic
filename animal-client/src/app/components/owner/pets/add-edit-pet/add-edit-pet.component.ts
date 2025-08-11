import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.scss']
})
export class AddEditPetComponent implements OnInit {
  @Input() petId: number;
  @Output() closeEditModeEvent: EventEmitter<any> = new EventEmitter();

  public minDate: Date;
  public maxDate: Date;
  public ownerId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setValuesFromRouterParams();
    this.setMinMaxDates();
  }
  
  closeEditMode(): void {
    this.closeEditModeEvent.emit();
  }

  private setValuesFromRouterParams(): void {
    this.route.params.subscribe(({ownerId}) => {
      this.ownerId = ownerId;
    })
  }
  private setMinMaxDates(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 30, 0, 1);
    this.maxDate = new Date();
  }
}
