import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AircraftComponent } from '../aircraft/aircraft.component';
import { AircraftService } from '../service/aircraft.service';
import { Aircraft } from '../model/aircraft';


@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.scss']
})
export class AircraftListComponent implements OnInit {

  isPopupOpened = true;

  constructor(private dialog?: MatDialog,
    private _aircraftService?: AircraftService) { }

  ngOnInit() {
    
  this.refreshAircraftList();
  }

  refreshAircraftList() {
    this._aircraftService.getAllAircrafts().subscribe(res =>{
      this._aircraftService._aircraftList = res as Aircraft[];
    });
  }

  get AircraftList() {
    return this._aircraftService.getAllAircrafts();
  }

  addAircraft() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(AircraftComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
    this.refreshAircraftList();
  }

  deleteAircraft(_id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this._aircraftService.deleteAircraft(_id).subscribe((res) => {
        this.refreshAircraftList();
       });
    }
  }

}
