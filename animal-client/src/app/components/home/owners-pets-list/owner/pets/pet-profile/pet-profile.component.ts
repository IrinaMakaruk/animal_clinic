import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PetsService } from '@services';

import { Pet } from '@models';

import * as moment from 'moment';

@Component({
  selector: 'pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.scss']
})

export class PetProfileComponent implements OnInit {
  public pet: Pet;
  public petId: number;
  public ownerId: number;
  public editMode: boolean = false;
  public isLoading: boolean = true;

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPetById();
  }

  getPetById(): void {
    this.route.params.subscribe(({ownerId, id}) => {
      this.petId = id;
      this.ownerId = ownerId;
      this.petsService.getPetById(this.petId, this.ownerId).subscribe((pet: Pet) => {
        this.isLoading = false;
        this.pet = {
          ...pet[0],
          age: this.calculateAge(pet[0].birthday)
        }
      });
    });
  }

  updatePetInfo(): void {
    this.editMode = !this.editMode;
    this.isLoading = true;
    this.getPetById();
  }

  private calculateAge( birthdate: Date ): string {
    const years = moment().diff(birthdate, 'years');
    const months = moment().diff(birthdate, 'month');
    return `${years === 0 ? months + ' months' : years + ' years' }`;
  }
}

