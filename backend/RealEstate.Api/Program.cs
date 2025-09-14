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

// CORS - Dynamic origins for production and development
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        var corsOrigins = Environment.GetEnvironmentVariable("CORS_ORIGINS");
        var allowedOrigins = new List<string>
        {
            "http://localhost:3000",
            "http://localhost:3001",
            "http://127.0.0.1:3000"
        };

        // Add origins from environment variable (comma-separated)
        if (!string.IsNullOrEmpty(corsOrigins))
        {
            allowedOrigins.AddRange(corsOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(origin => origin.Trim()));
        }

        // Add from appsettings.json configuration
        var configOrigins = builder.Configuration.GetSection("CorsOrigins").Get<string[]>();
        if (configOrigins != null)
        {
            allowedOrigins.AddRange(configOrigins);
        }

        policy.WithOrigins(allowedOrigins.Distinct().ToArray())
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
