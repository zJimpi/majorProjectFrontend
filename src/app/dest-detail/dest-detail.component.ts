import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDestService } from '../admin/service/add-dest.service';

@Component({
  selector: 'app-dest-detail',
  templateUrl: './dest-detail.component.html',
  styleUrls: ['./dest-detail.component.css']
})
export class DestDetailComponent implements OnInit{

  
  destId!:number
  destDetail:any
  constructor( private route: ActivatedRoute,
    private _router:Router,
    private _destService:AddDestService){}

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

  
}
