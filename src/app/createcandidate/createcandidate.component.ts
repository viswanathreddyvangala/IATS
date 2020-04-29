import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService } from '../common/services/upload.service';
import {InterviewstuffModel} from '../model/interviewstuff.model';
import { v4 as uuid } from 'uuid';
import {validateAndRewriteCoreSymbol} from '@angular/compiler-cli/src/ngtsc/imports';

@Component({
  selector: 'app-createcandidate',
  templateUrl: './createcandidate.component.html',
  styleUrls: ['./createcandidate.component.scss']
})
export class CreatecandidateComponent implements OnInit {
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  fileName:string='';

  ngOnInit() {
   if ( this.data){
     this.updateApplicant();
   }
  }
  isFileLoading=false;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreatecandidateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadService: UploadService
  ) {}

  interviewStuff: any = {
    rounds: [1, 2, 3, 4, 5, 6],
    streams: ['front-end', 'back-end', 'devops'],
    locations: ['HYD', 'BGLR', 'GUR', 'Delhi'],
    skillSet: ['Angular', 'Javascript', 'Java', 'Database'],
    position: ['Software Engineer' , 'Senior Software' , 'Associate', 'SeniorAssociate', 'HR' ]
  };

  cadidateForm = new FormGroup({
    id: new FormControl(null,Validators.required),
    candidateName: new FormControl(null),
    candidatePhoneNo: new FormControl(null),
    candidateEmail: new FormControl(null),
    interviweremail: new FormControl(null),
    interviewDate: new FormControl(null),
    round: new FormControl(null),
    stream: new FormControl(null),
    skillSet: new FormControl(null),
    location: new FormControl(null),
    position: new FormControl(null),
    interviewtime: new FormControl(null),
    resume: new FormControl(null)
  });



  // private uploadFiles() {
  //   this.fileUpload.nativeElement.value = '';
  //   this.files.forEach(file => {
  //     this.uploadFile(file);
  //   });
  // }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
        this.uploadFile(fileUpload.files.item(0));
    };
    fileUpload.click();
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file.name)
    file.inProgress = true;
    this.isFileLoading = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            this.isFileLoading = false;
            this.fileName = file.name;
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event);
      }
    });
  }
  addApplicant() {
    if (this.data) {
      return this.dialogRef.close(this.cadidateForm.value);
    }
    this.cadidateForm.controls['id'].setValue(uuid());
    this.cadidateForm.controls['resume'].setValue(this.fileName);
    if (this.cadidateForm.valid) {
      this.dialogRef.close(this.cadidateForm.value);
    }
  }

  updateApplicant() {
    this.cadidateForm.patchValue({
      id: this.data.id,
      candidateName: this.data.candidateName,
      candidatePhoneNo: this.data.candidatePhoneNo,
      candidateEmail: this.data.candidateEmail,
      interviweremail: this.data.interviweremail,
      interviewDate: this.data.interviewDate,
      round: this.data.round,
      stream: this.data.stream,
      skillSet: this.data.skillSet,
      location: this.data.location,
      position: this.data.position,
      interviewtime: this.data.interviewtime,
      resume: this.data.resume
    });
  }



}
