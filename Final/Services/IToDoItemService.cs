using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project4.Models;

namespace Project4.Services
{
    public interface IToDoItemService
    {
        public IEnumerable<ToDoItem> GetItems(string owner);

        public ToDoItem GetItem(int Id, string owner);

        public void CreateItem(ToDoItem item);

        public void DeleteItem(int Id, string owner);

        void UpdateItem(ToDoItem toDoItem, string owner);

        public IEnumerable<ToDoItem> QueryItem(string name, string owner);


    }
}
