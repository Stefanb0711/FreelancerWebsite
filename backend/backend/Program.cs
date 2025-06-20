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



//builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));

builder.Services.AddGraphQLServer().AddQueryType<Query>().AddMutationType<RootMutation>();



// CORS konfigurieren
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // URL deines Frontends
                .AllowAnyHeader()
                .AllowAnyMethod(); // Erlaubt jede HTTP-Methode (GET, POST, PUT, DELETE, etc.)
        });
});


builder.Services.AddControllers(); // Controller hinzufügen


// CORS aktivieren



builder.Services.AddHttpContextAccessor();




// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));

builder.Services.AddSingleton<MongoDbService>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoDbService(settings.ConnectionString, settings.DatabaseName);
});


builder.Services.AddSingleton<JwtTokenService>();
builder.Services.AddSingleton<AuthenticationService>();



var app = builder.Build();

// Configure the HTTP request pipeline.

/*
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}*/

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

//app.UseMiddleware<TokenValidationMiddleware>();

app.MapGraphQL("/graphql");


app.Run();

