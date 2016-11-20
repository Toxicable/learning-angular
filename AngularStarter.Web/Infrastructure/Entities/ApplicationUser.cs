using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using AngularStarterAuthServer.Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularStarterAuthServer
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            ExternalAccounts = new HashSet<ExternalAccount>();
        }
        
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<ExternalAccount> ExternalAccounts { get; set; }
    }
}
