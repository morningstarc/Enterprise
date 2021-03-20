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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edittodo',
  templateUrl: './edittodo.component.html',
  styleUrls: ['./edittodo.component.css'],
  providers: [DatePipe]
})


export class EdittodoComponent implements OnInit {
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
  ) { }

  ngOnInit() {
    let id = +this.router.snapshot.paramMap.get('itemId');
    this.todoitemService.getItem(id).subscribe(result => {
      this.todoItem = result
    });
    }
    
  updateItem(todoItem) {

    this.todoitemService.updateItem(this.todoItem).subscribe({
      next: response => this.successMessage = this.todoItem.Name + " was successfully updated",
      error: errorMessage => this.errorMessage = errorMessage
    });

  }

}

