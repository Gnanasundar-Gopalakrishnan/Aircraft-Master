import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDialogModule, MatToolbarModule, MatIconModule, MatSelectModule,MatAutocompleteModule,MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AircraftComponent } from './aircraft/aircraft.component';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';
import { AircraftService } from './service/aircraft.service';

@NgModule({
  declarations: [
    AppComponent,
    AircraftComponent,
    AircraftListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatButtonModule,
    BrowserModule
  ],
  providers: [AircraftService],
  entryComponents:[AircraftComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
