import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WildAnimal } from '@models';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { WildAnimalService } from '@services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wild-animal-list',
  templateUrl: './wild-animal-list.component.html'
})

export class WildAnimalListComponent implements OnInit {
  public disabledDelete: boolean = true;
  public selectedRowIndex: number = -1;
  public wildAnimalsCount: number = 0;
  public displayedColumns: string[] = ['id', 'trackingId', 'name', 'specie', 'birthday'];
  public dataSource: MatTableDataSource<WildAnimal>;
  public customerTotal: number;
  public noData: Array<WildAnimal> = [];
  public isLoading: boolean = true;
  
  @ViewChild(MatSort, {static: false}) set matSort(sort: MatSort) {
    if (this.dataSource) this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator, {static: false}) set matPaginator(paginator: MatPaginator) {
    if (this.dataSource) this.dataSource.paginator = paginator;
  }

  constructor(private wildAnimalService: WildAnimalService) {}

  selectRow(id: number): void {
    this.selectedRowIndex = id;
    this.disabledDelete = false;
  }

  ngOnInit(): void {
    this.getWildAnimalsCount();
    this.getWildAnimalsList();
  }

  applySearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteWildAnimal(): void {
    this.wildAnimalService.deleteWildAnimal(this.selectedRowIndex).subscribe(_data =>{
      this.dataSource.data.splice(this.selectedRowIndex, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  private getWildAnimalsCount(): void {
    this.wildAnimalService.getWildAnimalsCount().subscribe((count:number) => {
      this.wildAnimalsCount = count;
    });

  }
  private getWildAnimalsList(): void {
    this.wildAnimalService.getAllWildAnimals().
      subscribe((wildAnimal: Array<WildAnimal>) => {
        this.isLoading = false;
        const tableData: WildAnimal[] = !!wildAnimal.length ? wildAnimal : this.noData;
        this.dataSource = new MatTableDataSource(tableData);
        this.dataSource.connect().pipe(map(data => data.length === 0));
    });
  }
}
