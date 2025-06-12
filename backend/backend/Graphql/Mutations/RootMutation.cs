using backend.Services;
using MongoDB.Bson;
using backend.Models;
using backend.Graphql.Types.Auth.AuthInputs;
using Microsoft.AspNetCore.Identity;
using backend.Graphql.Types;
using System.Threading.Tasks;
using System;
using MongoDB.Driver;


namespace backend.Graphql.Mutations;

public class RootMutation
{


    //public AuthenticationMutation Authentication { get; set; } 
    //private readonly AuthenticationService _authenticationService;

    public RootMutation(MongoDbService mongoDbService/*, AuthenticationService authenticationService*/)
    {
        //_authenticationService = authenticationService;
    }


    [GraphQLName("login")]
    public Task<LoginResponse> LoginUser(LoginInput loginData)
    {
        return Task.FromResult(new LoginResponse
        {
            Message = "",
            Success = true,
            Token = ""
        });

    }

    
    


}