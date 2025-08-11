import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { OwnersService } from '@services';
import { Owner, Pet, OwnersPetsTableRow } from '@models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'owners-pets-list',
  templateUrl: './owners-pets-list.component.html'
})

export class OwnersPetsListComponent implements OnInit {
  public disabledDelete: boolean = true;
  public selectedRowIndex: number = -1;
  public ownersCount: number = 0;
  public displayedColumns: string[] = ['id', 'fullName', 'phoneNumber', 'email', 'petsList', 'address'];
  public dataSource: MatTableDataSource<OwnersPetsTableRow>;
  public customerTotal: number;
  public noData: Array<OwnersPetsTableRow> = [];
  public isLoading: boolean = true;
  public error$: Observable<boolean>;

  @ViewChild(MatSort, {static: false}) set matSort(sort: MatSort) {
    if (this.dataSource) this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator, {static: false}) set matPaginator(paginator: MatPaginator) {
    if (this.dataSource) this.dataSource.paginator = paginator;
  }

  constructor(private ownersService: OwnersService) {}

  selectRow(id: number): void {
    this.selectedRowIndex = id;
    this.disabledDelete = false;
  }

  ngOnInit(): void {
    this.getOwnersCount();
    this.getOwnersWithPetsList();
  }

  applySearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteOwner(): void {
    this.ownersService.deleteOwner(this.selectedRowIndex).subscribe(_data =>{
      this.dataSource.data.splice(this.selectedRowIndex, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  private getOwnersCount(): void {
    this.ownersService.getOwnersWithPetsCount().subscribe((count:number) => {
      this.ownersCount = count;
    });

  }
  private getOwnersWithPetsList(): void {
    this.ownersService.getAllOwnersWithPets().
      subscribe((owners: Array<Owner>) => {
        this.isLoading = false;
        const tableData: OwnersPetsTableRow[] = !!owners.length ? this.mapOwnersDataToTable(owners) : this.noData;
        this.dataSource = new MatTableDataSource(tableData);
        this.dataSource.connect().pipe(map(data => data.length === 0));
    });
  }

  private mapOwnersDataToTable( ownersList: Array<Owner>): OwnersPetsTableRow[] {
    const mapPetsListToString = (pets: Array<Pet>) => pets.map((pet:Pet) => pet.name).join();
    return ownersList.map( (owner: Owner) => ({
      id: owner.id,
      fullName: owner.fullName,
      phoneNumber: owner.phoneNumber,
      email: owner.email,
      petsList: mapPetsListToString(owner.pets),
      address: owner.address ? `${owner.address?.country}, ${owner.address?.city}, ${owner.address?.street}` : '-'
    }))
  }

}


