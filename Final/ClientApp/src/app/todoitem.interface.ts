import { Tag } from "./tag.interface";

export interface ToDoItem {
  Id: number;
  Name: string;
  DueDate: Date;
 // Tags: Tag;
  Description: string;
  Created: Date;
  isComplete: boolean;
}
