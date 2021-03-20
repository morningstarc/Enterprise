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
    public class SettingService
    {
        private TodoContext _context;

        public SettingService(TodoContext context)
        {
            _context = context;
            SeedDatabase();
        }


        private void SeedDatabase()
        {
            var defaultSetting = _context.Settings.Where<Setting>(setting => setting.Id == 1).FirstOrDefault();
            if (defaultSetting == null)
            {
                defaultSetting = new Setting()
                {
                    WarningDays = 2,
                    WarningHours = 0
                };
                _context.Settings.Add(defaultSetting);
                _context.SaveChanges();
            }
        }

        // GET: api/<controller>/
        [HttpGet()]
        public Setting GetSettings(string owner)
        {
            var setting = _context.Settings
                .Where<Setting>(setting => setting.Owner == owner)
                .FirstOrDefault();
            return setting;
        }

        // PUT: api/<controller>/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut()]
        public void UpdateSettings(Setting setting, string owner)
        {
            var toUpdate = GetSettings(owner);
            toUpdate.WarningDays = setting.WarningDays;
            toUpdate.WarningHours = setting.WarningHours;
          

            _context.SaveChanges();

           
        }

        // POST: api/<controller>
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public void CreateSettings(Setting setting)
        {
           
            _context.Settings.Add(setting);
            _context.SaveChanges();
                       
        }

    }
}

