using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project4.Models;


namespace Project4.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private UserManager<TodoUser> _userManager;
        private SignInManager<TodoUser> _signInManager;

        public LoginController(SignInManager<TodoUser> signInManager, UserManager<TodoUser> userManager)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateUser([FromBody]TodoUserLogin loginCreds)
        {
            var result = await _userManager.CreateAsync(new TodoUser()
            {
                UserName = loginCreds.UserName
            }, loginCreds.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Authenticate([FromBody]TodoUserLogin loginCreds)
        {
            var result = await _signInManager.PasswordSignInAsync
                (loginCreds.UserName, loginCreds.Password, true, false);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

       
    }
}
