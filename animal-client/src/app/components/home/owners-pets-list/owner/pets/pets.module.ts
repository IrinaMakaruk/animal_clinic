import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared-module';

import { PetsComponent } from './pets.component';
import { PetProfileComponent } from './pet-profile/pet-profile.component';
import { AddEditPetComponent } from './add-edit-pet/add-edit-pet.component';

@NgModule({
  declarations: [
    PetsComponent,
    PetProfileComponent,
    AddEditPetComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PetsComponent,
    SharedModule
  ]
})
export class PetsModule { }
