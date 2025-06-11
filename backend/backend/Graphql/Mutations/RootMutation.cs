using backend.Services;

namespace backend.Graphql.Mutations;

public class RootMutation
{
    
    public AuthenticationMutation Authentication { get; set; } 
    public RootMutation(MongoDbService mongoDbService)
    {
        Authentication = new AuthenticationMutation(mongoDbService);
    }
    
    
    
    
    
}