namespace backend.Graphql.Types.Auth.AuthInputs;

public class LoginInput
{
    public string UsernameOrEmail { get; set; }
    
    public string Password { get; set; }
}