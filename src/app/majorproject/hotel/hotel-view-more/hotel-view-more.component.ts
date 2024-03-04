import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';
import { AddRoomService } from 'src/app/admin/service/add-room.service';

@Component({
  selector: 'app-hotel-view-more',
  templateUrl: './hotel-view-more.component.html',
  styleUrls: ['./hotel-view-more.component.css']
})
export class HotelViewMoreComponent {
  
  hotelId!: number;
  hotel:any

  availableStatus:boolean=false

  displayedColumns: string[] = [
    'roomId', 
    'roomType', 
    'roomName', 
    'pricePerDay',
    'availability' ,
   
  ];

  dateForm:FormGroup
dataSource!: MatTableDataSource<any>;

constructor(private _roomService:AddRoomService,
  private route: ActivatedRoute,
  private _router:Router,
  private _hotelService:AddHotelService,
  private _fb:FormBuilder
  ){
    this.dateForm = this._fb.group({
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.getHotelById()
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
  
 
  getHotelById(){
        // Get the hotelId from the route params
        this.route.params.subscribe(params => {
          this.hotelId = +params['hotelId']; // '+' is for converting string to number
    this._hotelService.getHotelById(this.hotelId).subscribe({
      next:(res:any)=>{
        this.hotel = res;
        
      },error: console.log,
    }); 
  });
  }
  
  // bookRoomByHotelId(roomId:number){
  //   this._roomService.getRoomById(roomId).subscribe({
  //     next:(val:any)=>{
  //       console.log(val);
  //       this._router.navigate(['hotelBooking/',roomId]);
  //     },error:console.log,
  //   });
  //   // this._router.navigate(['/hotelBooking'])
  // }
  bookHotelById(){
      this._hotelService.getHotelById(this.hotelId).subscribe({
        next:(val:any)=>{
          this._router.navigate(['hotelBooking/',this.hotelId]);
        },error:console.log,
      });
      // this._router.navigate(['/hotelBooking'])
    }
  


  checkAvailibilityByHotelIdandRoomId(roomId:number){
    this.availableStatus = true
    console.log(this.availableStatus)
    console.log(roomId);
    console.log(this.dateForm.value);
    
    
  }


}
