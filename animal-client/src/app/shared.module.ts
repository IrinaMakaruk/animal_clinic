import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	imports:[
		RouterModule,
		CommonModule,
		MatStepperModule,
		MatIconModule,
		MatInputModule,
		MatButtonModule,
		MatDatepickerModule,
		MatRadioModule,
		MatNativeDateModule,
		MatTableModule,
		MatPaginatorModule,
		MatExpansionModule,
		MatSlideToggleModule,
		MatProgressSpinnerModule,
		MatCardModule,
		MatSortModule,
		MatSelectModule
	],
	declarations: [
	],
	exports: [
		RouterModule, 
		CommonModule,
		MatStepperModule,
		MatIconModule,
		MatInputModule,
		MatButtonModule,
		MatDatepickerModule,
		MatRadioModule,
		MatNativeDateModule,
		MatTableModule,
		MatPaginatorModule,
		MatExpansionModule,
		MatSlideToggleModule,
		MatProgressSpinnerModule,
		MatCardModule,
		MatSortModule
	]
})
export class SharedModule { }