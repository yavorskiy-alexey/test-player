export interface ISignal {
  timeStamp: number;
  frequency: number;
  point: ILatLon;
  zone: ILatLon[];
}

export interface ILatLon {
  lat: number;
  lon: number;
}
