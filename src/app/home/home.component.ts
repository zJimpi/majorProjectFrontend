
import { Component, AfterViewInit, ElementRef, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit{

  constructor(
    private route: ActivatedRoute, 
    private elementRef: ElementRef,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const scrollTo = params.get('scrollTo');
      if (scrollTo === 'popular') {
        this.scrollToPopularSection();
      }
    });
  }

  ngAfterViewInit(): void {
    
  }

  //scrols to popular section
  private scrollToPopularSection() {
    const popularSection = this.elementRef.nativeElement.querySelector('#popular');
    if (popularSection) {
      popularSection.scrollIntoView({ behavior: 'smooth' });
    }
  }


  //button shoul navigate to ddestination component
  navigateToDestination() {
    window.scrollTo(0, 0);
    this.router.navigate(['/destination']);
  }

  navigateToCarRentals(){
    window.scrollTo(0, 0);
    this.router.navigate(['/carRental']);
  }
  //openpakage page

  openpkgViewpage(){
    window.scrollTo(0, 0);
    this.router.navigate(['/pakageView']);
  }

    //openhotel page

    openHotelViewpage(){
      window.scrollTo(0, 0);
      this.router.navigate(['/hotelView']);
    }
}
