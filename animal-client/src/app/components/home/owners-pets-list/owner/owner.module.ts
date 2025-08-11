import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerComponent } from './owner.component';
import { PetsModule } from './pets/pets.module';

@NgModule({
  declarations: [
    OwnerComponent,
  ],
  imports: [
    CommonModule,
    PetsModule
  ],
  exports: [
    OwnerComponent
  ]
})
export class OwnerModule { }
