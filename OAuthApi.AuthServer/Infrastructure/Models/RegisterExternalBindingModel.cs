using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OAuthApi.AuthServer.Infrastructure.Models
{
    public class RegisterExternalBindingModel
    {
        public string Provider { get; set; }
        public string AccessToken { get; set; }
    }
}
