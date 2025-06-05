namespace backend.Graphql.Mutations;

public class RootMutation
{
    public AuthenticationMutation Authentication { get; set; } = new AuthenticationMutation(); 
    
    
    
}