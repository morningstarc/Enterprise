import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToDoItem } from '../todoitem.interface';
import { TodoitemService } from '../todoitem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-createtodo',
  templateUrl: './createtodo.component.html',
  styleUrls: ['./createtodo.component.css']
})


export class CreatetodoComponent implements OnInit {
  todoItem: ToDoItem;
  errorMessage: string;
  successMessage: string;
  dueDate: NgbDateStruct;
  initialDate: Date = new Date();
  time = {
    hour: this.initialDate.getHours(),
    minute: this.initialDate.getMinutes()
  };

  constructor(
    private todoitemService: TodoitemService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  
    
      this.todoItem = {
        Id: 0,
        Name: '',
        DueDate: new Date(),
        //Tags: {
        //  Id: 0,
        //  TagName: "",
        //},
        Description: '',
        Created: new Date(),
        isComplete: false,
      }
    }
  


  saveItem() {
    var due = new Date(this.dueDate.year, this.dueDate.month - 1, this.time.hour, this.time.minute);
    //var created = new Date();
    var utcDueDate = moment(due).utc();
    //var utcCreateDate = moment(created).utc();
    this.todoItem.DueDate = utcDueDate.toDate();
    //this.todoItem.Created = utcCreateDate.toDate();
    this.todoitemService.saveItem(this.todoItem).subscribe({
      next: response => this.successMessage = this.todoItem.Name + " was successfully created",
      error: errorMessage => this.errorMessage = errorMessage
    });

  }



  
}

