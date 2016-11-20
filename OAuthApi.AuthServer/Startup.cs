using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.IO;
using OpenIddict;
using CryptoHelper;
using OAuthApi.AuthServer.Extentions;
using AutoMapper;

namespace OAuthApi.AuthServer
{
    public class Startup
    {

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                //.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var env = services.BuildServiceProvider().GetRequiredService<IHostingEnvironment>();
            
            services.AddSingleton<Microsoft.Extensions.Configuration.IConfiguration>(Configuration);
            services.AddTransient< IExternalAuthorizationManager, ExternalAuthorizationManager>();

            services.AddMvc();

            services.AddEntityFramework()
                .AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=aspnet5-openiddict-sample;Trusted_Connection=True;MultipleActiveResultSets=true"));

            var config = new MapperConfiguration(x =>
            {

            });

            services.AddSingleton(sp => config.CreateMapper());


            // Register the Identity services.
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();


            var builder = services.AddOpenIddict<ApplicationDbContext>()
               .AddMvcBinders()
               .EnableTokenEndpoint("/connect/token")
               .AllowPasswordFlow()
               .AllowRefreshTokenFlow()                                   //or should this just be external then check in the controller
               .AllowCustomFlow("urn:ietf:params:oauth:grant-type:external_identity_token");

            if (env.IsDevelopment())
            {
                builder.AddEphemeralSigningKey();
            }
            else
            {
                //add in cert fingerprint
                builder.AddSigningCertificate(Configuration[$"AppSettings:CertFingerPrint"]);
            }

            builder.Configure(options =>
            {
                options.AllowInsecureHttp = env.IsDevelopment();
                options.ApplicationCanDisplayErrors = env.IsDevelopment();

                options.TokenEndpointPath = "/connect/token";

                // options.AccessTokenLifetime =
                //todo sort this out
                //    new TimeSpan(0, int.Parse(Configuration[$"AppSettings:AccessTokenLifetime"]), 0);
            });

            // Note: if you don't explicitly register a signing key, one is automatically generated and
            // persisted on the disk. If the key cannot be persisted, an exception is thrown.
            // 
            // On production, using a X.509 certificate stored in the machine store is recommended.
            // You can generate a self-signed certificate using Pluralsight's self-cert utility:
            // https://s3.amazonaws.com/pluralsight-free/keith-brown/samples/SelfCert.zip
            // 
            // services.AddOpenIddict<ApplicationDbContext>()
            //     .AddSigningCertificate("7D2A741FE34CC2C7369237A5F2078988E17A6A75");
            // 
            // Alternatively, you can also store the certificate as an embedded .pfx resource
            // directly in this assembly or in a file published alongside this project:
            // 
            // services.AddOpenIddict<ApplicationDbContext>()
            //     .AddSigningCertificate(
            //          assembly: typeof(Startup).GetTypeInfo().Assembly,
            //          resource: "AuthorizationServer.Certificate.pfx",
            //          password: "OpenIddict");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseDeveloperExceptionPage();            

            app.Map("/api", apiApp =>
            {
                apiApp.UseOAuthValidation();
                apiApp.UseSignalR2();
                apiApp.UseOpenIddict();
                apiApp.UseMvc(routes =>
                {
                    // Matches requests that correspond to an existent controller/action pair
                    routes.MapRoute(
                        name: "default",
                        template: "{controller}/{action}/{id?}");
                });
            });


            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404
                    && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}
