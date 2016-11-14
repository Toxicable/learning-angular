using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OAuthApi.AuthServer.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace OAuthApi.AuthServer
{
    public interface IExternalAuthorizationManager
    {
        Task<ExternalProfileBindingModel> GetProfile(string accessToken, string provider);
        Task<bool> VerifyExternalAccessToken(string accessToken, string provider);
    }

    public class ExternalAuthorizationManager : IExternalAuthorizationManager
    {
        private readonly IConfiguration _configuration;

        public ExternalAuthorizationManager(
            IConfiguration configuration
            )
        {
            _configuration = configuration;
        }

        public async Task<ExternalProfileBindingModel> GetProfile(string accessToken, string provider)
        {
            var url = $"https://graph.facebook.com/me?fields=email,first_name,last_name&access_token={ accessToken }";
            var client = new HttpClient();
            var uri = new Uri(url);
            var response = await client.GetAsync(uri);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                var profile = JsonConvert.DeserializeObject<ExternalProfileBindingModel>(content);
                return profile;
            }
            return null;
               
        }

        public async Task<bool> VerifyExternalAccessToken(string accessToken, string provider)
        {
            var verifyEndpoint = string.Empty;

            if (provider == "facebook")
            {
                var appToken = _configuration["Authentication:External:Facebook:apptoken"];
                verifyEndpoint = $"https://graph.facebook.com/debug_token?input_token={ accessToken }&access_token={ appToken }";
            }

            if (provider == "google")
            {
                verifyEndpoint = $"https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={ accessToken }";
            }

            if (string.IsNullOrWhiteSpace(verifyEndpoint))
            {
                return false;
            }

            var client = new HttpClient();
            var uri = new Uri(verifyEndpoint);
            var response = await client.GetAsync(uri);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();             

                if (provider == "facebook")
                {
                    var result = JsonConvert.DeserializeObject<FacebookDebugTokenBindingModel>(content);

                    if (!_configuration["Authentication:External:Facebook:appid"].Equals(result.Data.App_Id.ToString(), StringComparison.OrdinalIgnoreCase))
                    {
                        return false;
                    }

                }
                else if (provider == "google")
                {
                    var result = JsonConvert.DeserializeObject<GoogleTokenInfoBindingModel>(content);

                    if (!_configuration["Authentication:External:Google:clientid"].Equals(result., StringComparison.OrdinalIgnoreCase))
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
