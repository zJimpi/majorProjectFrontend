import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddHotelService } from '../../service/add-hotel.service';
import { CoreService } from '../../core/core.service';
import { AddRoomService } from '../../service/add-room.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';
import { AddRoomComponent } from '../add-room/add-room.component';

@Component({
  selector: 'app-view-hotel-tabel',
  templateUrl: './view-hotel-tabel.component.html',
  styleUrls: ['./view-hotel-tabel.component.css']
})
export class ViewHotelTabelComponent implements OnInit {
  displayedColumns: string[] = [
    'hotelId',
    'hotelName',
    'startingPrice',
    
    'address',
    'number',
    'imageFile',
    'room',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog,
    private _hotelService:AddHotelService,
    private _roomService:AddRoomService,
    private _coreService: CoreService,
    private _router:Router

    ){}

  ngOnInit(): void {
    
    this.getHotelList();
  }

  getHotelList(){
    this._hotelService.getHotelList().subscribe({
      next:(res:any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },error: console.log,
    });
  }

  //opens hotel form in a dialog
  openHotelForm(){
    const dialogRef =this._dialog.open(AddHotelComponent);

    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        this.getHotelList();
      }
    });
  }

  //when edit icon is cliked
  openEditHotelForm(data :any){
    const dialogRef =this._dialog.open(AddHotelComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getHotelList();
        }
      },
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

    viewRoomDetailByHotelId(hotelId:number){
      this._roomService.getRoomByHotelId(hotelId).subscribe({
        next:(val:any)=>{
          console.log(val);
          this._router.navigate(['room/getRoomByHotelId/',hotelId]);
        },error:console.log,
      });
    }

    deleteHotelDetails(id:number){
      this._hotelService.deleteHotel(id).subscribe({
        next:(res:any)=>{
          this._coreService.openSnackBar('hotels with room details deleted','done');
          this.getHotelList();
        },      error: (res) => {
          this._coreService.openSnackBar('hotels with room details deleted', 'done');
          this.getHotelList();},
      });
    }

    addRoomDetailByHotelId(id:number){

      this._hotelService.urlHotelId = id;
     
      const dialogRef =this._dialog.open(AddRoomComponent);

      dialogRef.afterClosed().subscribe({
        
      });
    }
}
