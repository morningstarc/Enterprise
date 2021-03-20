using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Project4.Models;

namespace Project4.Data
{
    public class TodoContext : IdentityDbContext<TodoUser>
    {
        public TodoContext (DbContextOptions<TodoContext> options): base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<ToDoItem> ToDoItems { get; set; }
       //public DbSet<Tag> Tags { get; set; }
        public DbSet<Setting> Settings { get; set; }
        }
}
