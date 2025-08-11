import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared-module';

import { WildAnimalListComponent } from './wild-animal-list.component';

import { WildAnimalListRoutingModule } from './wild-animal-list.routing.module';

@NgModule({
  declarations: [
    WildAnimalListComponent
  ],
  imports: [
    CommonModule,
    WildAnimalListRoutingModule,
    SharedModule
  ],
  exports: [
    WildAnimalListComponent
  ]
})
export class WildAnimalListModule { }
