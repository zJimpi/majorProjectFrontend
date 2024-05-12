import { Component, Input,ViewChild ,OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AddDestService } from 'src/app/admin/service/add-dest.service';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';
import { AddRoomService } from 'src/app/admin/service/add-room.service';


@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.css']
})
export class HotelViewComponent implements OnInit{

  @Input() state: string='';
  @Input() location: string='';
  @Input() showHero: boolean = true;
  @Input() accessedFromOutside: boolean = false;

  hotels !:any[];
  filteredHotels: any[] = [];
  searchQuery: string = '';
 
  constructor(private _router:Router,
    private _hotelService: AddHotelService,
    private _roomService:AddRoomService,
    private _destService:AddDestService){

    }
    ngOnInit(): void {
    if (!this.accessedFromOutside) {
      this.getHotelList();}
      else{this.getHotelListByLocation(this.state,this.location);}
      
      
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

    getHotelListByLocation(state:any,location:any){
      this._destService.getHotelByLocation(state,location).subscribe({
        next:(res:any)=>{
          this.hotels = res;
          this.filteredHotels = [...this.hotels];
          
        },error: console.log,
      });
    }


    getStarIcons(score: number): string {
      const fullStars = Math.floor(score);
      const halfStar = score - fullStars >= 0.5 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;
    
      return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    }
}
