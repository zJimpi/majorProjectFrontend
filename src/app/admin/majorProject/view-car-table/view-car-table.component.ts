import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCarDetailsService } from '../../service/add-car-details.service';
import { CoreService } from '../../core/core.service';
import { Router } from '@angular/router';
import { AddCarComponent } from '../add-car/add-car.component';

@Component({
  selector: 'app-view-car-table',
  templateUrl: './view-car-table.component.html',
  styleUrls: ['./view-car-table.component.css']
})
export class ViewCarTableComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'location',
    'shopName',
    'averagePrice',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog : MatDialog,
    private _carDetailsService : AddCarDetailsService,
    private _coreService : CoreService,
    private _router:Router){}

  ngOnInit(): void {
  this.getCarRentalDetailsList();

  }

  getCarRentalDetailsList(){
    this._carDetailsService.getCarRentalDetailsList().subscribe({
      next:(res:any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openCarDetailsForm(){
    const dialogRef =this._dialog.open(AddCarComponent);

    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        this.getCarRentalDetailsList();
      }
    });
  }

  openEditCarRentalDetailsForm(data :any){
    const dialogRef =this._dialog.open(AddCarComponent, {data,});

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCarRentalDetailsList();
        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCarRentalDetails(id:number){
    this._carDetailsService.deleteCarRentalDetails(id).subscribe({
      next:(res:any)=>{
        console.log(id);
        this._coreService.openSnackBar('Car Rental Location Details Deleted','done');
        this.getCarRentalDetailsList();
      },      
      error: (res) => {
        this._coreService.openSnackBar('Car Rental Location Details Deleted', 'done');
        this.getCarRentalDetailsList();},
    });
  }
}