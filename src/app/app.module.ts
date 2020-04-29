import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { CadidateslistComponent } from './cadidateslist/cadidateslist.component';
import {CreatecandidateModule} from './createcandidate/createcandidate.module';
import { FetchcadidatesService } from './cadidateslist/fetchcadidates.service';
import { CreatecandidateComponent } from './createcandidate/createcandidate.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CadidateslistComponent,
    DashboardComponent,
    CreatecandidateComponent,
  ],
  imports: [
    MatIconModule,
    MatPaginatorModule,
    CreatecandidateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatSortModule,
    NoopAnimationsModule,
    MatInputModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatTableModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,
  ],
  providers: [FetchcadidatesService],
  entryComponents: [ CreatecandidateComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
