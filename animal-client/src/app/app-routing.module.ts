import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';

import { PetsComponent } from '@components/owner/pets/pets.component';
import { OwnerComponent } from '@components/owner/owner.component';
import { WildAnimalComponent } from '@components/wild-animal/wild-animal.component';
import { NewVisitFormComponent } from '@components/home/new-visit-form/new-visit-form.component';
import { OwnersPetsListComponent } from '@components/home/owners-pets-list/owners-pets-list.component';
import { WildAnimalListComponent } from '@components/home/wild-animal-list/wild-animal-list.component';
import { PetProfileComponent } from './components/owner/pets/pet-profile/pet-profile.component';
import { AddEditPetComponent } from './components/owner/pets/add-edit-pet/add-edit-pet.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/new', pathMatch: 'full' },
  { path: 'home',
    component: HomeComponent,
    children: [
      { path: 'new', component: NewVisitFormComponent },
      { path: 'owners', component: OwnersPetsListComponent},
      { path: 'wild-animals', component: WildAnimalListComponent }
    ]
  },
  { path: 'owner-profile/:ownerId', component: OwnerComponent},
  { path: 'owner-profile/:ownerId/add-new-pet', component: AddEditPetComponent },
  { path: 'pet-profile/:id/:ownerId', component: PetProfileComponent },
  { path: 'wild-animal/profile/:id', component: WildAnimalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
