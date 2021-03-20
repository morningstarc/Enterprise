using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project4.Data;
using Project4.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class SettingController : Controller
    {
        //private readonly TodoContext _context;
        private SettingService settingService;


        public SettingController(SettingService settingService)

        {
            this.settingService = settingService;
        }

      

        // GET: api/<controller>/5
        [HttpGet()]
        public ActionResult<Setting> Get()
        {
            Setting setting = this.settingService.GetSettings(this.User.Identity.Name);

            if (setting == null)
            {
                return NotFound();
            }

            return Ok(setting);
        }

        // PUT: api/<controller>/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut()]
        public ActionResult Put([FromBody]Setting setting)
        {
            this.settingService.UpdateSettings(setting, this.User.Identity.Name);
            return Ok();
        }

        // POST: api/<controller>
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult Post([FromBody]Setting setting)
        {
            setting.Owner = this.User.Identity.Name;
            this.settingService.CreateSettings(setting);
            return Ok();
        }
    }
}
