import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { OwnerModule } from '@components/owner/owner.module';
import { HomeModule } from '@components/home/home.module';
import { WildAnimalComponent } from '@components/wild-animal/wild-animal.component';

import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    WildAnimalComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    OwnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  schemas : [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
