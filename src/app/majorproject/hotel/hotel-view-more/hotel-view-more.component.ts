import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddHotelService } from 'src/app/admin/service/add-hotel.service';
import { AddRoomService } from 'src/app/admin/service/add-room.service';
import { ReviewService } from 'src/app/service/review.service';

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
    'imageFile', 
    'roomType', 
    'roomName', 
    'pricePerDay',
    
    'selected'
    // 'availability' ,

   
  ];

  roomSelections: { roomId: number, noRooms: number }[] = [];
  reviewForm:FormGroup
  dateForm:FormGroup
  dataSource!: MatTableDataSource<any>;

constructor(private _roomService:AddRoomService,
  private route: ActivatedRoute,
  private _router:Router,
  private _hotelService:AddHotelService,
  private _fb:FormBuilder,
  private _reviewService:ReviewService
  ){
    this.dateForm = this._fb.group({
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required]
    });

    this.reviewForm =this._fb.group({
      comment:''
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
        console.log(this.hotel);
        
        
        
      },error: console.log,
    }); 
  });
  }
  

  bookHotelById(){
      this._hotelService.getHotelById(this.hotelId).subscribe({
        next:(val:any)=>{
          this._router.navigate(['hotelBooking/',this.hotelId],{ state: { roomSelections: this.roomSelections } });
          // console.log(this.roomSelections)
        },error:console.log,
      });
      // this._router.navigate(['/hotelBooking'])
    }
  

  toggleGuestInput(checked: boolean, roomId: number) {
    if (checked) {
      // Checkbox is checked, call addRoomSelection with default guests (0)
      this.addRoomSelection(roomId, 0, true);
    } else {
      // Checkbox is unchecked, call addRoomSelection with guests as 0 to remove room selection
      this.addRoomSelection(roomId, 0, false);
    }
  }

  addRoomSelection(roomId: number, noRooms: number, isChecked: boolean) {
    if (isChecked) {
      // If checkbox is checked, add or update room selection
      const existingSelectionIndex = this.roomSelections.findIndex(selection => selection.roomId === roomId);
      if (existingSelectionIndex !== -1) {
        // Update existing room selection
        this.roomSelections[existingSelectionIndex].noRooms = noRooms;
      } else {
        // Add new room selection
        this.roomSelections.push({ roomId, noRooms });
      }
    } else {
      // If checkbox is unchecked, remove room selection
      const existingSelectionIndex = this.roomSelections.findIndex(selection => selection.roomId === roomId);
      if (existingSelectionIndex !== -1) {
        // Remove room selection
        this.roomSelections.splice(existingSelectionIndex, 1);
      }
    }
  }
  
  addReview(){
    const reviewFormData={
      username:"username(change)",
      location:this.hotel.location,
      hotelName:this.hotel.hotelName,
      comment:this.reviewForm.value.comment,
    }
   this._reviewService.addReview(reviewFormData).subscribe({
    next: (val: any) => {
     console.log("comment added");
     this.reviewForm.reset();
     
    },
    error: (err: any) => {
      console.error(err);
    },
   });
  }
 

}
