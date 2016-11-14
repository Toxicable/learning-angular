﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using OAuthApi.AuthServer.Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OAuthApi.AuthServer
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            ExternalAccounts = new HashSet<ExternalAccount>();
        }
        public ICollection<ExternalAccount> ExternalAccounts { get; set; }
    }
}