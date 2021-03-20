using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project4.Data;
using Project4.Models;

namespace Project4.Services
{
    public class ToDoItemService : IToDoItemService
    {
        private TodoContext _context;

        public ToDoItemService(TodoContext context)
        {
            _context = context;
            
        }


       
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<ToDoItem> GetItems(string owner)
        {

            var items = _context.ToDoItems.Where(toDoItem => toDoItem.Owner == owner).ToList();
            return items;
        }

        // GET: api/<controller>/5
        [HttpGet("{id}")]
        public ToDoItem GetItem(int id, string owner)
        {
            var toDoItem = _context.ToDoItems
                .Where<ToDoItem>(toDoItem => toDoItem.Id == id && toDoItem.Owner == owner)
                .FirstOrDefault();
            return toDoItem;
        }

        // PUT: api/<controller>/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public void UpdateItem(ToDoItem toDoItem, string owner)
        {
            var toUpdate = GetItem(toDoItem.Id, owner);
            toUpdate.isComplete = toDoItem.isComplete;
            toUpdate.Description = toDoItem.Description;
            toUpdate.DueDate = toDoItem.DueDate;
            toUpdate.Name = toDoItem.Name;
            //toUpdate.Tags = toDoItem.Tags;

            _context.SaveChanges();


        }

        // POST: api/<controller>
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public void CreateItem(ToDoItem toDoItem)
        {
            //for (int i = 0; i < toDoItem.Tags.Count(); i++)
            //{
            //    toDoItem.Tags.ToArray()[i].Id = 0;
            //}
            _context.ToDoItems.Add(toDoItem);
            _context.SaveChanges();

        }

        // DELETE: api/<controller>/5
        [HttpDelete("{id}")]
        public void DeleteItem(int id, string owner)
        {
            var toDelete = GetItem(id, owner);
            _context.ToDoItems.Remove(toDelete);
            _context.SaveChanges();

        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<ToDoItem> QueryItem(string name, string owner)
        {

            var itemsFound = _context.ToDoItems
                .Where<ToDoItem>(toDoItem => toDoItem.Name.Contains(name) && toDoItem.Owner == owner)
                .ToList();
            return itemsFound;
        }



    }




}
