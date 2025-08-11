import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { OwnersService, OwnersPetsService } from '@services';

import { Owner, Address } from '@models';

import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})

export class OwnerComponent implements OnInit {
  public ownerForm: FormGroup;
  public owner: Owner;
  public ownerId: number;
  public editMode: boolean = false;
  public isLoading: boolean = true;

  constructor (
    private ownersPetsService: OwnersPetsService,
    private ownersService: OwnersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOwnersWithPetsList();
  }

  onSubmit(): void {
    this.isLoading = true;

    if (this.ownerForm.invalid) return;

    const form = this.ownerForm.controls;

    const owner: Owner = {
      fullName: form.fullName.value ?? '',
      email: form.email.value ?? '',
      phoneNumber: form.phoneNumber.value ?? '',
    };

    const address: Address = {
      country: form.country.value ?? '',
      city: form.city.value ?? '',
      street: form.street.value ?? '',
      zipCode: form.zipCode.value ?? '',
      ownerId: Number(this.ownerId)
    }

     this.ownersService.updateOwner(this.ownerId, owner)
      .pipe(mergeMap(_ => this.ownersService.updateAddress(this.ownerId, address)))
        .subscribe(_ => {
          this.isLoading = false;
          this.owner = {
            ...owner,
            address
          };
          this.editMode = !this.editMode;
        });
  }

  private getOwnersWithPetsList(): void {
    this.route.params.subscribe(params => {
      this.ownerId = params.ownerId;
      this.ownersPetsService.getOwnerInfoWithPets(this.ownerId).subscribe((owner: Owner) => {
        this.isLoading = false;
        this.owner = owner;
        this.ownerId = owner.id;
        this.setOwnerFormData();
      })
    })
  }

  private setOwnerFormData(): void {
    this.ownerForm = new FormGroup({
      'fullName': new FormControl(this.owner.fullName ?? '',[Validators.required]),
      'phoneNumber': new FormControl(this.owner.phoneNumber ?? ''),
      'email': new FormControl(this.owner.email ?? ''),
      'country': new FormControl(this.owner.address?.country ?? ''),
      'city': new FormControl(this.owner.address?.city ?? ''),
      'street': new FormControl(this.owner.address?.street ?? ''),
      'zipCode': new FormControl(this.owner.address?.zipCode ?? '')
    });
  }
}

