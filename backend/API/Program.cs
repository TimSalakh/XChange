using DAL.Entities.Contexts;
using DAL.Entities.Models;
using DAL.Repositories.Abstractions;
using DAL.Repositories.Implementations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<XChangeDbContext>();
builder.Services.AddScoped<IBaseRepository<Account>, BaseRepository<Account>>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOriginPolicy",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});
    

var app = builder.Build();

app.UseCors("AllowAnyOriginPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
