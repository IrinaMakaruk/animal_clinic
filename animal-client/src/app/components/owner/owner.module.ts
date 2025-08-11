import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared-module';

import { OwnerComponent } from './owner.component';
import { PetsComponent } from './pets/pets.component';
import { PetProfileComponent } from './pets/pet-profile/pet-profile.component';
import { AddEditPetComponent } from './pets/add-edit-pet/add-edit-pet.component';

@NgModule({
  declarations: [
    OwnerComponent,
    PetsComponent,
    PetProfileComponent,
    AddEditPetComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    OwnerComponent,
    SharedModule
  ]
})
export class OwnerModule { }
