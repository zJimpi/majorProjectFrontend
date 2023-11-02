import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DestFormComponent } from '../dest-form/dest-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from '../core/core.service';
import { AddDestService } from '../service/add-dest.service';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.css']
})
export class AddDestinationComponent implements OnInit {

  
  displayedColumns: string[] = [
    'destId',
    'destName',
    'destType',
    'imageLocation',
    'stateAndUTName',
    'imageFile',
    'popularityScore',
    'imageDescription',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog,
    private _destService: AddDestService,
    private _coreService: CoreService,
    private _httpClient:HttpClient
    ){}
    ngOnInit(): void {
      this.getDestinationList();
   
    }



  openDestForm(){
    //open by component
    const dialogRef = this._dialog.open(DestFormComponent)
    //when colse button is closed
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          //refreeshes the list
          this.getDestinationList();
        }
      },
    });
  }



  //show the tables
  getDestinationList() {
    this._destService.getDestinationList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

 

  //for seaching by name ..and other feilds
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //when delete icon is cicked
  deleteDestination(id: number) {
    this._destService.deleteDestination(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Destination deleted!', 'done');
        this.getDestinationList();
      },
      error: (res) => {
        this._coreService.openSnackBar('Destination deleted!', 'done');
        this.getDestinationList()},
    });
  }

  //when edit icon is clicked
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(DestFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDestinationList();
        }
      },
    });
  }

  
}
