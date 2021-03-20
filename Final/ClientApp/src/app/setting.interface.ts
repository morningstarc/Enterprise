import { ToDoItem } from "./todoitem.interface";

export interface Setting {
  Id: number;
  ToDoItem: ToDoItem;
  WarningDays: number;
  WarningHours: number; 
}
