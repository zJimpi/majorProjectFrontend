import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDestService } from '../admin/service/add-dest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-dest-detail',
  templateUrl: './dest-detail.component.html',
  styleUrls: ['./dest-detail.component.css']
})
export class DestDetailComponent implements OnInit{

  
  destId!:number
  destDetail:any
  reviewForm:FormGroup
  constructor( private route: ActivatedRoute,
    private _router:Router,
    private _destService:AddDestService,
    private _fb:FormBuilder,
    private _reviewService:ReviewService
    ){
      this.reviewForm =this._fb.group({
        comment:''
      });
    }

  ngOnInit(): void {
    this.getDestDetailsById()
  }

  getDestDetailsById(){
    
    this.route.params.subscribe(params => {
      this.destId = +params['destId']; 

      this._destService.getDestinationById(this.destId).subscribe({
        next:(res:any)=>{
            this.destDetail = res;
    
        },error: console.log,
      }); 
    });
  }

  addReview(){
    const reviewFormData={
      username:"username(change)",
      location:this.destDetail.imageLocation,
     
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

  getStarIcons(score: number): string {
    const fullStars = Math.floor(score);
    const halfStar = score - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
  
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
  }

}
