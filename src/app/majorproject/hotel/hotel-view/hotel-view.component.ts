import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';
import { AddRoomService } from 'src/app/admin/service/add-room.service';


@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.css']
})
export class HotelViewComponent implements OnInit{


  
  hotels !:any[];
  filteredHotels: any[] = [];
  searchQuery: string = '';

  constructor(private _router:Router,
    private _hotelService: AddHotelService,
    private _roomService:AddRoomService){

    }
    ngOnInit(): void {
    
      this.getHotelList();
    }
  
    getHotelList(){
      this._hotelService.getHotelList().subscribe({
        next:(res:any)=>{
          this.hotels = res;
          this.filteredHotels = [...this.hotels];
          
        },error: console.log,
      });
    }

    // seachbar for hotel 
    filterHotels(searchQuery: string): void {
      this.filteredHotels = this.hotels.filter(h =>
        h.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    viewRoomDetailByHotelId(hotelId:number){
      this._roomService.getRoomByHotelId(hotelId).subscribe({
        next:(val:any)=>{
          console.log(val);
          this._router.navigate(['hotelView/getRoomByHotelId/',hotelId]);
        },error:console.log,
      });
    }
}
