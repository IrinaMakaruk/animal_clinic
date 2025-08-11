import { Component, OnInit, Input } from '@angular/core';

import { OwnersPetsService } from '@services';

import { Pet } from '@models';

import * as moment from 'moment';

@Component({
  selector: 'pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})

export class PetsComponent implements OnInit {

  @Input() ownerId: number;

  public birthdate: Date;
  public age: number;
  public pets: Array<Pet> = [];
  public isLoading: boolean = true;
  
  constructor(private ownersPetsService: OwnersPetsService) {}

  ngOnInit(): void {
    this.ownersPetsService.getOwnerPets(this.ownerId).subscribe((pets: Array<Pet>) => {
      this.isLoading = false;
      this.pets = this.mapPatsList(pets);
    })
  }

  private mapPatsList(pets:Array<Pet>): Partial<Array<Pet>> {
    return pets.map(( pet: Pet) => ({
      ...pet,
      age: this.calculateAge(pet.birthday)
    }));
  }

  private calculateAge(birthdate: Date): string {
    const years = moment().diff(birthdate, 'years');
    const months = moment().diff(birthdate, 'month');
    return `${years === 0 ? months + ' months' : years + ' years' }`;
  }
}
