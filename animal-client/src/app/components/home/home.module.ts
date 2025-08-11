import { NgModule } from '@angular/core';

import { SharedModule } from '@shared-module';

import { HomeComponent } from './home.component';
import { OwnersPetsListComponent } from './owners-pets-list/owners-pets-list.component';
import { WildAnimalListComponent } from './wild-animal-list/wild-animal-list.component';
import { NewVisitFormComponent } from './new-visit-form/new-visit-form.component';

import { HttpClientModule } from '@angular/common/http';

import { OwnersService } from '@services';

@NgModule({
  declarations: [
    HomeComponent,
    OwnersPetsListComponent,
    WildAnimalListComponent,
    NewVisitFormComponent
  ],
  imports: [
    HttpClientModule,
    SharedModule
  ],
  exports: [
    HomeComponent,
  ],
  providers: [
    OwnersService
  ]
})
export class HomeModule { }
