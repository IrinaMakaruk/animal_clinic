import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared-module';

import { OwnersPetsListComponent } from './owners-pets-list.component';

import { OwnerModule } from './owner/owner.module';

@NgModule({
  declarations: [
    OwnersPetsListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    OwnerModule
  ],
  exports: [
    OwnersPetsListComponent
  ]
})
export class OwnersPetsListModule { }
