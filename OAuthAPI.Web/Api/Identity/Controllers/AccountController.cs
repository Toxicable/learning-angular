using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security.Provider;
using Newtonsoft.Json.Linq;
using OAuthAPI.Data.Identity;
using OAuthAPI.WebApi.Api.Identity.Managers;
using OAuthAPI.WebApi.Api.Identity.Models.BindingModels;
using OAuthAPI.WebApi.Api.Identity.Models.ViewModels;
using OAuthAPI.WebApi.Api.Results;
using SendGrid;

namespace OAuthAPI.WebApi.Api.Identity.Controllers
{
    [Authorize]
    public class AccountController : BaseApiController
    {
        //GET: api/account/IsAuthenticated
        [HttpGet]
        public async Task<IHttpActionResult> IsAuthenticated()
        {
            return Ok("true");
        }

        //GET: api/account/CreateUser
        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> Create(CreateUserBindingModel createUserModel)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser()
            {
                UserName = createUserModel.Username,
                Email = createUserModel.Username,
                AccountCreated = DateTimeOffset.Now,
            };


            IdentityResult addUserResult = await AppUserManager.CreateAsync(user, createUserModel.Password);

            if (!addUserResult.Succeeded)
            {
                return GetIdentityErrorResult(addUserResult);
            }

            //Uri locationHeader = new Uri(Url.Link("GetUser", new { Id = user.Id }));

            //return Created(locationHeader, _mapper.Map<UserViewModel>(user));
            return Ok();
        }

        //GET: api/account/SendConfirmEmail
        [HttpGet]
        public async Task<IHttpActionResult> SendConfirmEmail()
        {
            var userId = User.Identity.GetUserId();
            string code = await AppUserManager.GenerateEmailConfirmationTokenAsync(userId);

           // var callbackUrl = new Uri(Url. Link("ConfirmEmail", new {  userId, code }));

            //we need to do this otherwise the + in the string gets replaced with a space
            var urlCode = Uri.EscapeDataString(code);
            var url = $"{Request.RequestUri.Scheme}://{Request.RequestUri.Authority}/auth/verify?userId={userId}&code={urlCode}";

            var body = $"Please confirm your account by clicking <a href=\"{url}\">here</a>";
            
            await AppUserManager.SendEmailAsync(userId, "Confirm your account", body);
                                                    
            return Ok();
        }

        //GET: api/account/ConfirmEmail
        [HttpGet, AllowAnonymous]
        public async Task<IHttpActionResult> ConfirmEmail(string userId = "", string code = "")
        {
            var escapedCode  = Uri.UnescapeDataString(code);
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(escapedCode))
            {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }

            IdentityResult result = await AppUserManager.ConfirmEmailAsync(userId, code);

            if (result.Succeeded)
            {
                return Ok();
            }
            
            return GetIdentityErrorResult(result);
            
        }
        //POST: api/account/ChangePassword
        [HttpPost]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await AppUserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.Password);

            if (!result.Succeeded)
            {
                return GetIdentityErrorResult(result);
            }

            return Ok();
        }

        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> SendForgotPassword(SendForgotPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await AppUserManager.FindByNameAsync(model.UserName);
            string code = await AppUserManager.GeneratePasswordResetTokenAsync(user.Id);

            //we need to do this otherwise the + in the string gets replaced with a space
            var urlCode = Uri.EscapeDataString(code);
            var url = $"{Request.RequestUri.Scheme}://{Request.RequestUri.Authority}/auth/reset-password?userId={user.Id}&code={urlCode}";

            await AppUserManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + url + "\">here</a>");

            return Ok();
        }

        [HttpPost, AllowAnonymous]
        public async Task<IHttpActionResult> ResetPassword(ResetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await AppUserManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                ModelState.AddModelError("", "Account does not exist");
                return BadRequest(ModelState);
            }

            var result = await AppUserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return GetIdentityErrorResult(result);

        }

    }
}