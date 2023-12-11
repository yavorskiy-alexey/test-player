import {ISignal} from '../models/interfaces';

export const generateSignal = (timeStamp: number): ISignal => {
  return {
    timeStamp,
    frequency: 1000,
    point: {lat: 30, lon: 50},
    zone: [
      {lat: 30, lon: 50},
      {lat: 30.1, lon: 50.1},
      {lat: 30.2, lon: 50.2},
    ]
  };
};
