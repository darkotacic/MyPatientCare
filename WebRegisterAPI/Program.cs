﻿using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace WebRegisterAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //MyScheduler.IntervalInSeconds(15, 0, 10,
            //() =>
            //{
            //    Console.WriteLine("//here write the code that you want to schedule");
            //});

            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
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
