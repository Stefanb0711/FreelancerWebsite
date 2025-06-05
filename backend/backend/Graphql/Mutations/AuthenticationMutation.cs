using backend.Graphql.Types;
using backend.Graphql.Types.Auth.AuthInputs;

namespace backend.Graphql.Mutations;

public class AuthenticationMutation
{
    
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


    [GraphQLName("register")]
    public Task<Response> RegisterUser(RegisterInput registerData)
    {
        return Task.FromResult(new Response
        {
            Message = "",
            Success = true
        });

    }
    
    
    
}