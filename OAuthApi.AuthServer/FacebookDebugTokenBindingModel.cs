using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OAuthApi.AuthServer
{
    public class FacebookDebugTokenBindingModel
    {
        public FacebookDebugTokenData Data { get; set; }
    }
    public class FacebookDebugTokenData
    {
        public long App_Id { get; set; }
        public string Application { get; set; }
        public long Expires_At { get; set; }
        public bool Is_Valid { get; set; }
        public List<string> Scopes { get; set; }
        public long User_Id { get; set; }
    }
}
