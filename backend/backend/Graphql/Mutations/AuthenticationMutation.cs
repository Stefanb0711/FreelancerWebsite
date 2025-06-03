using backend.Graphql.Types;
using backend.Graphql.Types.Auth.AuthInputs;

namespace backend.Graphql.Mutations;

public class AuthenticationMutation
{
    
    [GraphQLName("login")]
    public Task<LoginResponse> LoginUser(LoginInput loginData)
    {
        if ()
        {
            
        }
    }


    [GraphQLName("register")]
    public Task<Response> RegisterUser(RegisterInput registerData)
    {
        
    }

    
}