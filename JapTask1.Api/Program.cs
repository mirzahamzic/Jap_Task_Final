using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace JapTask1.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {


            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                }).ConfigureLogging(logging =>
                {
                    logging.AddLog4Net(new Log4NetProviderOptions("log4net.config"));
                });



    }
}


//public static IHostBuilder CreateHostBuilder(string[] args) =>
//           Host.CreateDefaultBuilder(args)
//               .ConfigureWebHostDefaults(webBuilder =>
//               {
//                   webBuilder.UseStartup<Startup>();
//               }).ConfigureLogging(logging =>
//               {
//                   logging.AddLog4Net(new Log4NetProviderOptions("log4net.config"));
//               });