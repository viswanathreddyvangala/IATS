import { Component, OnInit, ViewChild } from '@angular/core';
import { FetchcadidatesService} from './fetchcadidates.service';
import {CandidatesList} from '.././model/cadidate-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {CreatecandidateComponent} from '../createcandidate/createcandidate.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadidateslist',
  templateUrl: './cadidateslist.component.html',
  styleUrls: ['./cadidateslist.component.scss']
})
export class CadidateslistComponent implements OnInit {

  isDataLoading = false;
  displayedColumns = ['name', 'phone', 'cadidateemail', 'intervieweremail', 'dateofinterview' , 'interviewtime', 'resume', 'stream', 'round', 'skillSet', 'location', 'position','actions'];

  constructor(private fetchlist: FetchcadidatesService, public dialog: MatDialog,private snackBar: MatSnackBar) { }
  dataSource = new MatTableDataSource<CandidatesList>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  ngOnInit(): void {
    this.getcandidateList();
  }

  getcandidateList(){
    this.isDataLoading = true;
    this.fetchlist.getCadidatesList()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isDataLoading = false;
      });
  }

  createApplicant(){
    const dialogRef = this.dialog.open(CreatecandidateComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data){
      this.isDataLoading = true;
      this.fetchlist.postCadidatesList(data).subscribe(data =>
        this.getcandidateList());
        this.fetchlist.sendMails(data)
          .subscribe(data => {
            this.snackbar.open(data, 'Undo', {
              duration: 3000
            });
          });
      }
      });

  }

  editApplicant(data: any){
    const dialogRef = this.dialog.open(CreatecandidateComponent, {data})
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.isDataLoading = true;
        this.fetchlist.updateCadidatesList(data).subscribe(data => this.getcandidateList());
      }
    });
  }
  deleteApplicant(id: any){
    this.fetchlist.deleteCandidateList(id).subscribe(data => this.getcandidateList());
  }
}
