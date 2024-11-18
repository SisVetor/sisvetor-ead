import OpenLocationCode from "../mapas-component/OpenLocationCode";

export default class GeoLocalizacao {
    constructor(latitude: number, longitude: number) {
        if (latitude !== null && longitude !== null) {
            this.latitude = latitude;
            this.longitude = longitude;
            this.plusCode = OpenLocationCode.encode(latitude, longitude);
        }
    }
    latitude: number;
    longitude: number;
    plusCode: string;
}