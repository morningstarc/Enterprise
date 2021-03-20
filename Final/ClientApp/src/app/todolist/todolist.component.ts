import { Component, OnInit } from '@angular/core';
import { TodoitemService } from '../todoitem.service';
import { ToDoItem } from '../todoitem.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit {

  
  items: ToDoItem[] = [];
  errorMessage: string;
  
  
  constructor(
    private todoitemService: TodoitemService,
    private router: Router
  ) { }

  ngOnInit() {
    this.todoitemService.getAllItems().subscribe({
      next: allItems => {
        this.items = allItems;
      }
    });
  }

  deleteItem(id: number) {

    
    var x = this.items.findIndex(
      
          x => {
        x.Id == id;
      }
    ); 

    this.todoitemService.deleteItem(id).subscribe({
      next: resp => {
        this.items.splice(x);
      },
      error: error => this.errorMessage = error
    });
  }

  markComplete(item) {
    item.isComplete = true;
    this.todoitemService.updateItem(item).subscribe({
      next: resp => this.router.navigate(['/']),
      error: error => this.errorMessage = error
    });
  }

 
}
