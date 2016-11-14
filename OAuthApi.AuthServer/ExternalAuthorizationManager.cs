﻿using Microsoft.Extensions.Configuration;
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
        Task<ExternalProfileBindingModel> GetProfile(string accessToken, ExternalAuthProviders provider);
        Task<bool> VerifyExternalAccessToken(string accessToken, string provider);
    }

    public enum ExternalAuthProviders
    {
        facebook,
        google
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

        public async Task<ExternalProfileBindingModel> GetProfile(string accessToken, ExternalAuthProviders provider)
        {
            if(provider == ExternalAuthProviders.facebook)
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

            if (provider == ExternalAuthProviders.google)
            {

            }


        }

        public async Task<bool> VerifyExternalAccessToken(string accessToken, ExternalAuthProviders provider)
        {
            var verifyEndpoint = string.Empty;

            if (provider == ExternalAuthProviders.facebook)
            {
                var appToken = _configuration["Authentication:External:Facebook:apptoken"];
                verifyEndpoint = $"https://graph.facebook.com/debug_token?input_token={ accessToken }&access_token={ appToken }";
            }

            if (provider == ExternalAuthProviders.google)
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

                if (provider == ExternalAuthProviders.facebook)
                {
                    var result = JsonConvert.DeserializeObject<FacebookDebugTokenBindingModel>(content);

                    if (!_configuration["Authentication:External:Facebook:appid"].Equals(result.Data.App_Id, StringComparison.OrdinalIgnoreCase))
                    {
                        return false;
                    }

                }
                else if (provider == ExternalAuthProviders.google)
                {
                    var result = JsonConvert.DeserializeObject<GoogleTokenInfoBindingModel>(content);

                    if (!_configuration["Authentication:External:Google:clientid"].Equals(result.azp, StringComparison.OrdinalIgnoreCase))
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
