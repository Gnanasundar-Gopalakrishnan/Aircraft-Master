import { Injectable } from '@angular/core';
import { Aircraft } from '../model/aircraft';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AircraftService {


  _aircraftList: Aircraft[] ;
  selectedAircraft : Aircraft;

  readonly baseURL ='http://localhost:3000/aircraft';

  constructor(private http: HttpClient) { }

  addAircraft(aircraft: Aircraft) {
    return this.http.post(this.baseURL, aircraft);
  }

  getAllAircrafts() {
    return this.http.get(this.baseURL);
  }

  editDepartment(aircraft: Aircraft) {
    return this.http.patch(this.baseURL + `/${aircraft._id}`, aircraft);
  }


  deleteAircraft(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }


}