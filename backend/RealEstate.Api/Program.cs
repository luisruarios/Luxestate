using Microsoft.OpenApi.Models;
using RealEstate.Api.Repositories;
using RealEstate.Api.Services;
using RealEstate.Api.Validators;

var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel for Heroku deployment
builder.WebHost.ConfigureKestrel(options =>
{
    var port = Environment.GetEnvironmentVariable("PORT");
    if (!string.IsNullOrEmpty(port))
    {
        options.ListenAnyIP(int.Parse(port));
    }
});

// Config
builder.Services.Configure<MongoSettings>(builder.Configuration.GetSection("MongoSettings"));

// CORS - Dynamic origins for production
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? "http://localhost:3000";
        var allowedOrigins = new List<string>
        {
            "http://localhost:3000",
            "http://localhost:3001",
            frontendUrl
        };

        policy.WithOrigins(allowedOrigins.ToArray())
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Services
builder.Services.AddSingleton<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<IDataSeederService, DataSeederService>();

builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "RealEstate API", Version = "v1" });
});

// Validators
builder.Services.AddValidators();

var app = builder.Build();

// Seed data on startup
using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<IDataSeederService>();
    await seeder.SeedDataAsync();
}

app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

// Workaround for integration testing
public partial class Program { }
