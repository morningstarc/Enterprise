using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project4.Models
{
    public class ToDoItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

       // public IList<Tag> Tags { get; set; }

        public string Description { get; set; }

        public DateTime Created { get; set; }

        public bool isComplete { get; set; }

        public string Owner { get; set; }

    }
}