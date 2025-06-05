using backend.Graphql.Types;
using backend.Services;

namespace backend.Graphql.Queries;

public class Query
{

    /*
    public Query(MongoDbService mongoDbService)
    {
        
    }
    */
    
    
    public Task<HelloResponse> Hello()
    {

        return Task.FromResult(new HelloResponse
        {
            Hello = "Hello World"
        });
        
    }
    


    
    //public string HelloWorld() => "Hallo Welt!";
    
    
}