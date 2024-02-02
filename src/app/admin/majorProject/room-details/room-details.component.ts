import { Component, Inject, OnInit } from '@angular/core';
import { AddRoomService } from '../../service/add-room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddRoomComponent } from '../add-room/add-room.component';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit{

  //for the url config
  hotelId!: number;
  displayedColumns: string[] = [
    'roomId', 
    'roomType', 
    'roomName', 
    'pricePerDay', 
    'action'
];
  dataSource!: MatTableDataSource<any>;

  constructor(private _roomService:AddRoomService,
    private route: ActivatedRoute,
    private _coreService:CoreService,
    private _dialog: MatDialog,
    private _router:Router
    ){}

    ngOnInit(): void {
      this.loadRoomDetails();
    }

    loadRoomDetails(){
      // Get the hotelId from the route params
      this.route.params.subscribe(params => {
        this.hotelId = +params['hotelId']; // '+' is for converting string to number
        // Fetch room details by hotelId
        this._roomService.getRoomByHotelId(this.hotelId).subscribe(
          (rooms: any[]) => {
            this.dataSource = new MatTableDataSource<any>([]);
              this.dataSource.data = rooms; 
          },
          error => {
            console.error('Error fetching room details:', error);
          }
        );
      });
    }
    deleteRoomDetails(id:number){
      this._roomService.deleteRoom(id).subscribe({
        next:(res:any)=>{
          this._coreService.openSnackBar('room details deleted','done');
          this.loadRoomDetails();
        },error: (res) => {
          this._coreService.openSnackBar('room details deleted', 'done');
          this.loadRoomDetails();},
      });
    }

    //when edit icon is clicked
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddRoomComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadRoomDetails();
        }
      },
    });
  }

}
