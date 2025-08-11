import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Pet, Species } from '@models';

import { PetsService } from '@services';

import { mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.scss']
})

export class AddEditPetComponent implements OnInit {
  @Input() petData: Pet;
  @Input() petId: number;

  @Output() closeEditModeEvent: EventEmitter<any> = new EventEmitter();

  public minDate: Date;
  public maxDate: Date;
  public ownerId: number;
  public petForm: FormGroup;
  public submitted: boolean;
  public isLoading: boolean;
  public error: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petsService: PetsService) {}

  ngOnInit(): void {
    this.setValuesFromRouterParams();
    this.setMinMaxDates();
    this.setFormData();
    this.petData && this.omitIdFromPetData();
  }

  closeEditMode(pet: Pet): void {
    this.closeEditModeEvent.emit(pet);
  }

  deletePet(): void {
    this.isLoading = true;
    this.petsService.deletePet(this.petId).subscribe(_=> {
      this.isLoading = false;
      this.navigateToOwnerProfile();
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.isLoading = true;

    if (this.petForm.invalid) return;

    const form = this.petForm.controls;

    const pet: Pet = {
      name: form.name.value ?? '',
      birthday: form.birthday.value ?? '',
      sex: form.sex.value ?? '',
      color: form.color.value ?? '',
      size: form.size.value ?? '',
      vaccinated: form.vaccinated.value ?? '',
      briefInfo: form.briefInfo.value ?? '',
      ownerId: Number(this.ownerId),
    };

    const species: Species = {
      label: form.specie.value ?? ''
    }
    
    const savePet$ = this.petData 
      ? this.updatePet(pet, species)
      : this.addNewPet(pet, species)

    savePet$.subscribe((pet?: Pet) => {
      const editedPet = {id: this.petId, ...this.petForm.value }
      this.closeEditMode(editedPet);
      pet.id && this.navigateToOwnerProfile();
      this.isLoading = false;
    },
    error => {
      this.error = error;
      this.isLoading = false;
    });
  }

  private setFormData(): void {
    const editPetMode = this.petData && Object.keys(this.petData).length > 0;
    this.petForm = new FormGroup({
      'name': new FormControl(editPetMode ? this.petData.name : '',[Validators.required]),
      'birthday': new FormControl(editPetMode ? this.petData.birthday : '',[Validators.required]),
      'specie': new FormControl(editPetMode ? this.petData.species?.label : ''),
      'sex': new FormControl(editPetMode ? this.petData.sex : ''),
      'size': new FormControl(editPetMode ? this.petData.size : ''),
      'color': new FormControl(editPetMode ? this.petData.color : ''),
      'vaccinated': new FormControl(editPetMode ? this.petData.vaccinated : false),
      'briefInfo': new FormControl(editPetMode ? this.petData.briefInfo : ''),
      'ownerId': new FormControl(null),
    });
  }

  private addNewPet(pet: Pet, species: Species):Observable<any> {
    return this.petsService.addPet(pet, this.ownerId)
      .pipe(
        mergeMap((pet: Pet) => this.petsService.savePetSpecie(species, pet.id)));
  }

  private updatePet(pet: Pet, species: Species): Observable<any> {
    return forkJoin([
      this.petsService.editPet({id: this.petId,...pet}),
      this.petsService.editPetSpecie(species, this.petId)
    ]);
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

  private omitIdFromPetData(){
    const {id, ...omittedPetData } = this.petData;
    this.petData = omittedPetData;
  }
  private navigateToOwnerProfile(){
    this.router.navigate([`home/owners/owner-profile/${this.ownerId}`]);
  }
}

