using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using OAuthAPI.Data;
using OAuthAPI.Data.Identity;
using OAuthAPI.WebApi.Api.Services;
using System.Threading.Tasks;

namespace OAuthAPI.WebApi.Api.Identity.Managers
{
    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        private ApplicationDbContext _context { get; set; }
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public async Task<bool> AddExternalLogin(ExternalAccount externalAccount, ApplicationUser user)
        {
            externalAccount.Id = Guid.NewGuid().ToString();

            user.ExternalAccount.Add(externalAccount);

            await _context.SaveChangesAsync();

            return true;
        } 
       

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            
            var appDbContext = context.Get<ApplicationDbContext>();
            var appUserManager = new ApplicationUserManager(new UserStore<ApplicationUser>(appDbContext));

            // Configure validation logic for usernames
            appUserManager.UserValidator = new UserValidator<ApplicationUser>(appUserManager)
            {
                RequireUniqueEmail = false,
                
            };

            // Configure validation logic for passwords
            appUserManager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = true,
                RequireLowercase = false,
                RequireUppercase = false,
            };
            
            appUserManager.EmailService = new EmailService();

            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                appUserManager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"))
                {
                    //Code for email confirmation and reset password life time
                    TokenLifespan = TimeSpan.FromHours(6)
                };
            }
           
            return appUserManager;
        }
    }
}