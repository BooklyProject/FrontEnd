import { Component, Input, OnInit } from '@angular/core';
import { Evento } from '../model/Evento';
import { GeocodingService } from '../geocoding.service';
import { GeocoderResponse } from '../model/geocoder-response';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pagina-evento',
  templateUrl: './pagina-evento.component.html',
  styleUrls: ['./pagina-evento.component.css']
})
export class PaginaEventoComponent implements OnInit {
  
  @Input() evento: Evento | null= null;
  tornaIndietro: boolean = false;

  tornaAEventi(){
    this.tornaIndietro = !this.tornaIndietro;
  }


  mapZoom = 12;
  mapCenter: google.maps.LatLng | null = null;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  };

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  geocoderWorking = false;
  geolocationWorking = false;

  address: string = "";
  formattedAddress?: string | null = null;
  locationCoords?: google.maps.LatLng | null = null;

  get isWorking(): boolean {
    return this.geolocationWorking || this.geocoderWorking;
  }

  findAddress() {
    if(this.evento) {
      this.address = this.evento?.luogo;
    }
  
    this.geocoderWorking = true;
    this.geocodingService
      .getLocation(this.address)
      .subscribe(
        (response: GeocoderResponse) => {
          if (response.status === 'OK' && response.results?.length) {
            const location = response.results[0];
            const loc: any = location.geometry.location;
  
            this.locationCoords = new google.maps.LatLng(loc.lat, loc.lng);
  
            this.mapCenter = location.geometry.location;
  
            this.address = location.formatted_address;
            this.formattedAddress = location.formatted_address;
            this.markerInfoContent = location.formatted_address;
  
            this.markerOptions = {
              draggable: true,
              animation: google.maps.Animation.DROP,
            };
          } else {
            this.toastr.error(response.error_message, response.status);
          }
        },
        (err: HttpErrorResponse) => {
          console.error('geocoder error', err);
        }
      )
      .add(() => {
        this.geocoderWorking = false;
      });
  }

  ngOnInit(): void {
      this.findAddress();
  }

  constructor(private toastr: ToastrService, private geocodingService: GeocodingService) {
    
  }
}
