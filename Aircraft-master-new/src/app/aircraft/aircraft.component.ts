import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AircraftService } from '../service/aircraft.service';
import { Aircraft } from '../model/aircraft';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss'],
  providers: [AircraftService]
})
export class AircraftComponent implements OnInit {
  public _aircraftForm: FormGroup;
  AircraftFamily = new FormControl();
  AircraftType = new FormControl();

  fams: string[] = [];
  types: string[] = [];


  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;


  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AircraftComponent>,
    private _aircraftService: AircraftService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this._aircraftForm = this._formBuilder.group({
      _id: [this.data._id],
      manufacturer: [this.data.manufacturer, [Validators.required]],
      aircraftFamily: [this.data.aircraftFamily, [Validators.required]],
      aircraftType: [this.data.aircraftType, [Validators.required]],
      category: [this.data.category, [Validators.required]]
    });

    this.refreshAircraftList();
  }

  onSubmit(form: NgForm) {
    this._aircraftService.addAircraft(form.value).subscribe((res) => {
      this._aircraftForm = this._formBuilder.group({
        _id: [this.data._id],
        manufacturer: [this.data.manufacturer, [Validators.required]],
        aircraftFamily: [this.data.aircraftFamily, [Validators.required]],
        aircraftType: [this.data.aircraftType, [Validators.required]],
        category: [this.data.category, [Validators.required]]
      });
    });
    this.dialogRef.close();
    this.refreshAircraftList();

  }
  refreshAircraftList() {
    this._aircraftService.getAllAircrafts().subscribe(res => {
      this._aircraftService._aircraftList = res as Aircraft[];
    });
  }
}
