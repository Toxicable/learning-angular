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
using AngularStarterAuthServer.Extentions;
using AutoMapper;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ApplicationInsights;

namespace AngularStarterAuthServer
{
    public class Startup
    {

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            if (env.IsDevelopment())
            {
                builder.AddApplicationInsightsSettings(developerMode: true);
                builder.AddUserSecrets();
            }

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var env = services.BuildServiceProvider().GetRequiredService<IHostingEnvironment>();

            services.AddApplicationInsightsTelemetry(Configuration);

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
               .AllowCustomFlow("urn:ietf:params:oauth:grant-type:external_identity_token")
               .SetAccessTokenLifetime(TimeSpan.FromMinutes(double.Parse(Configuration["Authentication:TokenLifespan"])));

            if (env.IsDevelopment())
            {
                builder.AddEphemeralSigningKey();
            }
            else
            {
                services.AddMvc(options => { options.Filters.Add(new RequireHttpsAttribute()); });
                builder.AddSigningCertificate(Configuration["WEBSITE_LOAD_CERTIFICATES"]);
            }

            builder.Configure(options =>
            {
                options.AllowInsecureHttp = env.IsDevelopment();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseApplicationInsightsRequestTelemetry();
            app.ApplicationServices.GetService<TelemetryClient>().Context.Properties["Environment"] = env.EnvironmentName;

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseApplicationInsightsExceptionTelemetry();

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
