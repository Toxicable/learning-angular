﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularStarterAuthServer.Infrastructure.Models
{
    public class RegisterExternalBindingModel
    {
        public ExternalAuthProviders Provider { get; set; }
        public string AccessToken { get; set; }
    }
}
