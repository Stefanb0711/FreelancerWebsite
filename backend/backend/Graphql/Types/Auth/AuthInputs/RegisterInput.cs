namespace backend.Graphql.Types.Auth.AuthInputs;

public class RegisterInput
{
    public string Username { get; set; }
    
    public string Email { get; set; }
    
    public string Password { get; set; }    
    
    public string ConfirmPassword { get; set; }
}