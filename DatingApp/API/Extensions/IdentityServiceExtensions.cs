using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;

using API.interfaces;
using API.Services;
using API.Data;


namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config) {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => 
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            return services;
        }
    }
}

