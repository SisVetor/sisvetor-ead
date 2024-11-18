import { GoogleMapsAPIWrapper, MapsAPILoader } from "@agm/core";
import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";

declare var google: any;

@Injectable()
export class GMapsService extends GoogleMapsAPIWrapper {
    constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
        super(__loader, __zone);
    }

    getLatLan(address: string) {
        const geocoder = new google.maps.Geocoder();
        return new Observable((observer) => {
            geocoder.geocode({ address: address }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].geometry.location);
                    observer.complete();
                    return;
                }
                observer.next({});
                observer.complete();
            });
        });
    }

    getEndereco(lat: number, lng: number) {
        console.log("Carregando Latidude Longitude", lat, lng);
        const geocoder = new google.maps.Geocoder();
        const latlng = new google.maps.LatLng(lat, lng);
        const request = { latLng: latlng };
        return new Observable((observer) => {
            geocoder.geocode(request, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].formatted_address);
                    observer.complete();
                    return;
                }
                console.log("Error - ", results, " & Status - ", status);
                observer.next({});
                observer.complete();
            });
        });
    }
}
