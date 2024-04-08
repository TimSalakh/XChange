using API.BLL.Services.Implementations;
using API.BLL.Services.Interfaces;
using API.DAL.Contexts;
using API.DAL.Entites;
using API.DAL.Repositories.Implementations;
using API.DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace API.Web.Extensions;

public static class Middleware
{
    public static void ApplyIdentity(this WebApplicationBuilder builder)
    {
        builder.Services.AddIdentity<User, Role>(options =>
        {
            options.User.RequireUniqueEmail = true;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            options.Password.RequiredLength = 12;
        }).AddEntityFrameworkStores<XChangeDbContext>();
    }

    public static void ApplyAuth(this WebApplicationBuilder builder)
    {
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidIssuer = builder.Configuration.GetSection("Jwt:Issuer").Value,
                ValidateAudience = true,
                ValidAudience = builder.Configuration.GetSection("Jwt:Audience").Value,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Jwt:SigningKey").Value!)),
                ValidateLifetime = true
            };
        });

        builder.Services.AddSwaggerGen(option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo { Version = "v1" });
            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            option.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[]{}
                }
            });
            });
        }

    public static void ApplyDI(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<ILetterRepository, LetterRepository>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<ILetterService, LetterService>();
        builder.Services.AddScoped<IAdminService, AdminService>();
        builder.Services.AddScoped<ITokenService, TokenService>();
    }
}
