import { Component, OnInit,Input} from '@angular/core';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{


  @Input() hLocation:string='';
  @Input() pLocation:string='';
  @Input() dLocation:string='';
  @Input() hotelName:string='';
  @Input() packageName:string='';
  @Input() hotelAccesed:boolean | undefined =false;
  @Input() pkgAccesed:boolean=false;
  @Input() destAccesed:boolean=false;

  reviews!:any
  constructor(private _reviewService:ReviewService){

  }
  ngOnInit(): void {
    if (this.hotelAccesed) {
        this.loadHotelReview(this.hLocation, this.hotelName);
        console.log("hotel")
        console.log(this.hLocation);
        console.log(this.hotelName);
    } 
    else if (this.pkgAccesed) {
      
        this.loadpackagesReview(this.pLocation, this.packageName);
        console.log("pkg")
        console.log(this.pLocation);
        console.log(this.packageName);
        
        
    } 
    else if(this.destAccesed){
      this.laodDestinationReview(this.dLocation);
      console.log(this.dLocation);
      
    }
    else {
        this.loadAllReviews();
        
    }
  }

  loadAllReviews(){
    this._reviewService.getReviewList().subscribe({
      next:(res:any)=>{
        this.reviews = res;

      },error: console.log,
    });
  }

  loadHotelReview(hLocation:string,hotelName:string){
    this._reviewService.getHotelReview(hLocation,hotelName).subscribe({
      next:(res:any)=>{
        this.reviews = res;
        console.log("inside load hotel review");
        
      },error: console.log,
    });
  }

  loadpackagesReview(pLocation:string,packageName:string){
    this._reviewService.getPackageReview(pLocation,packageName).subscribe({
      next:(res:any)=>{
        this.reviews = res;

      },error: console.log,
    });
  }

  laodDestinationReview(dLocation:string){
    this._reviewService.getDestionReviewList(dLocation).subscribe({
      next:(res:any)=>{
        this.reviews = res;

      },error: console.log,
    });
  }
}
