import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COMMON_EXPORTS } from '../../core/common-exports.constants';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared-modules';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    COMMON_EXPORTS,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  cityName: string = 'Hyderabad';
  weatherData: any = null;
  forecastData: any[] = [];
  noDataFound: boolean = false;

  private apiKey = '7b8367f622803c81eb5f01191086fadb';

  topCities: string[] = [
    'Hyderabad',
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow',
    'Surat',
    'Visakhapatnam',
    'Bhopal',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Patna',
    'Coimbatore',
    'Thiruvananthapuram',
    'Vadodara',
    'Warangal',
    'Khammam',
    'Mahabubabad',
    'Nizamabad',
    'Karimnagar',
    'Ramagundam',
    'Mahbubnagar',
    'Nalgonda',
    'Adilabad',
    'Siddipet',
    'Miryalaguda',
    'Suryapet',
    'Jagtial',
    'Mancherial',
    'Kamareddy',
    'Zaheerabad',
    'Bodhan',
    'Vikarabad',
    'Bhadradri Kothagudem',
    'Medak'
  ];

  today: string = '';
  private intervalId: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getWeather();
    this.startClock();
  }

  getWeather(): void {
    if (!this.cityName) return;

    console.log('Fetching weather for:', this.cityName);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.apiKey}&units=metric`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.weatherData = {
          city: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          main: data.weather[0].main
        };
        this.noDataFound = false;
        this.loadMockForecast();
      },
      error: (err) => {
        console.error('Weather API error:', err);
        this.noDataFound = true;
        this.weatherData = null;
      }
    });
  }


  getBackgroundClass(): string {
    if (!this.weatherData) return '';
    const condition = this.weatherData.main.toLowerCase();
    if (condition.includes('rain')) return 'bg-rain';
    if (condition.includes('cloud')) return 'bg-cloud';
    if (condition.includes('clear')) return 'bg-clear';
    return 'bg-default';
  }

  loadMockForecast() {
    this.forecastData = [
      {
        day: 'Tomorrow',
        temp: 30,
        icon: '10d',
        description: 'light rain'
      },
      {
        day: 'Day After',
        temp: 33,
        icon: '01d',
        description: 'clear sky'
      },
      {
        day: 'In 3 Days',
        temp: 28,
        icon: '03d',
        description: 'scattered clouds'
      }
    ];
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
