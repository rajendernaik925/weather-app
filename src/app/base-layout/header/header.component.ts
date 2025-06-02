import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Corrected here
})
export class HeaderComponent implements OnInit {
  dropdownVisible: boolean = false;
  today: string = '';
  private intervalId: any;
  appLogo: string = 'public/images/app-logo.png';

  ngOnInit(): void {
    this.startClock();
  }

  profile(event: MouseEvent) {
    this.dropdownVisible = !this.dropdownVisible;
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const clickedInside = event.target instanceof HTMLElement && event.target.closest('.d-flex');
    if (!clickedInside) {
      this.dropdownVisible = false;
    }
  }


  startClock() {
  this.updateCurrentDateTime(); // immediate run
  this.intervalId = setInterval(() => {
    this.updateCurrentDateTime();
  }, 1000); // update every second
}

updateCurrentDateTime() {
  const date = new Date();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const suffix = this.getDaySuffix(day);
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  this.today = `${dayName}, ${day}${suffix} ${month} ${year}, ${hour12}:${minutes}:${seconds} ${ampm}`;
}

getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

ngOnDestroy(): void {
  clearInterval(this.intervalId); // cleanup timer
}
}
