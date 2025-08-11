import { Component, OnInit } from '@angular/core';
import { OwnersService } from '@services';
import { ActivatedRoute } from '@angular/router';
import { Pet, Owner } from '@models';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  public owner: Owner;
  public ownerId: number;
  public editMode: boolean = false;
  public isLoading: boolean = true;

  constructor (
    private ownersService: OwnersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ownerId = params.ownerId;
      this.ownersService.getOwnerInfoWithPets(this.ownerId).subscribe((owner: Owner) => {
        this.isLoading = false;
        this.owner = owner;
      })
    })
  }

}
