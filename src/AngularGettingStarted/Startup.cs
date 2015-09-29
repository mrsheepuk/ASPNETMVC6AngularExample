using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Routing.Constraints;

namespace AngularGettingStarted
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app)
        {
            // Serve our static assets with the highest priority - JS files, CSS files, etc.
            app.UseStaticFiles();

            // Use MVC for the remaining routes.
            app.UseMvc(routes =>
            {
                // First, create a default API route for our WebAPI endpoints - this will handle anything
                // starting with api/.
                routes.MapRoute("api", 
                    template: "api/{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "ApiDetails" });
                
                // Now map *all* remaining routes to the default controller, as they'll all
                // route to our single-page application.
                routes.MapRoute("default", 
                    template: "{*url}", 
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
