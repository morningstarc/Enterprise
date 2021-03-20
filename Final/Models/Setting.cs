using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Project4.Models;

namespace Project4.Data
{
    public class Setting
    {
        [Key]
        public int Id { get; set; }
        public int WarningDays { get; set; }
        public int WarningHours { get; set; }
        public string Owner { get; set; }
    }
}