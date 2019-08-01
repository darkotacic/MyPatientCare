using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace WebRegisterAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //MyScheduler.IntervalInSeconds(00, 32, 15,
            //() =>
            //{
            //    Console.WriteLine("//here write the code that you want to schedule");
            //});

            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false)
                .Build();

            var url = config["ApplicationSettings:Server_URL"].ToString();

            CreateWebHostBuilder(args, url).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args, string url) =>
            WebHost.CreateDefaultBuilder(args)
                .UseKestrel()
                .UseUrls(url)
                .UseStartup<Startup>();
    }
}
