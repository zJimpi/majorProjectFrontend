import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';
import { Hotel } from 'src/app/hotel';

@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.css']
})
export class HotelViewComponent implements OnInit{

  hotel:string[]=[
    'hotelId',
	  'hotelName',
	  'startingPrice',
	  'address',
	  'number' 
  ]

  hotels !: Hotel[];
  constructor(private _router:Router,
    private _hotelService: AddHotelService){

    }
    ngOnInit(): void {
    
      this.getHotelList();
    }
  
    getHotelList(){
      this._hotelService.getHotelList().subscribe({
        next:(res:any)=>{
          this.hotels = res;
          
        },error: console.log,
      });
    }



    loadBookingPage(){
      this._router.navigate(['/hotelBooking'])
    }
    loadHotelRooms(){
      this._router.navigate(['/hotelViewMore'])
    }
}
