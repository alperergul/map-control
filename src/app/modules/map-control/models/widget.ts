export interface Widget {
  id: number;
  isActive: boolean;
  coordinate: L.LatLng;
  name: string;
  temp: number | string;
  humidity: number | string;
  date: Date;
  battery: number;
}
