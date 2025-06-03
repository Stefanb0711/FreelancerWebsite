using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options; 
using backend.Services;
using backend.Graphql.Mutations;
using backend.Graphql.Queries;
using HotChocolate.AspNetCore;
using backend.Models;

//using backend.Graphql.Types;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<Graphql.Mutations.Mutation>();


builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));

builder.Services.AddGraphQLServer().AddQueryType<Query>().AddMutationType<RootMutation>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddHttpContextAccessor();


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<MongoDbService>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoDbService(settings.ConnectionString, settings.DatabaseName);
});

builder.Services.AddSingleton<JwtTokenService>();
builder.Services.AddScoped<AuthService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));


builder.Services.AddSingleton<MongoDbService>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoDbService(settings.ConnectionString, settings.DatabaseName);
});


builder.Services.AddSingleton<JwtTokenService>();
builder.Services.AddScoped<TokenValidationFilter>();
builder.Services.AddScoped<AuthService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<TokenValidationMiddleware>();



app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}