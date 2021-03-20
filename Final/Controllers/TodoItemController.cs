using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project4.Data;
using Project4.Models;
using Project4.Services;

namespace Project4.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class TodoItemController : Controller
    {
        //private readonly TodoContext _context;
        private IToDoItemService toDoItemService;


        public TodoItemController(IToDoItemService toDoItemService)

        { 
            this.toDoItemService = toDoItemService;
        }

        // GET: api/<controller>
        [HttpGet]
        public ActionResult<IEnumerable<ToDoItem>> Get([FromQuery]string name)
        {
            var owner = this.User.Identity.Name;
           
            if (string.IsNullOrWhiteSpace(name))
            {

                return Ok(this.toDoItemService.GetItems(owner));
                
            }
            else
            {
                var itemsFound = this.toDoItemService.QueryItem(name, owner);
                if (itemsFound.Any())
                {
                   
                        return Ok(itemsFound);
                    
                }
                else
                {
                    return NotFound();
                }
            }

        }

        // GET: api/<controller>/5
        [HttpGet("{id}")]
        public ActionResult<ToDoItem> Get(int id)
        {
            ToDoItem toDoItem = this.toDoItemService.GetItem(id, this.User.Identity.Name);
            
            if (toDoItem == null)
            {
                return NotFound();
            }

            return Ok(toDoItem);
        }

        // PUT: api/<controller>/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public ActionResult Put([FromBody]ToDoItem toDoItem)
        {
            this.toDoItemService.UpdateItem(toDoItem, this.User.Identity.Name);
            return Ok();
        }

        // POST: api/<controller>
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult Post([FromBody]ToDoItem toDoItem)
        {
            toDoItem.Owner = this.User.Identity.Name;
            this.toDoItemService.CreateItem(toDoItem);
            return Ok();
        }

        // DELETE: api/<controller>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            this.toDoItemService.DeleteItem(id, this.User.Identity.Name);
            return Ok();
        }

    }
}
