using System.Xml;
using backend.Graphql.Types;
using backend.Models;
using backend.Services;
using MongoDB.Driver;
using Newtonsoft.Json;
using Formatting = System.Xml.Formatting;
using MongoDB.Bson;


namespace backend.Graphql.Queries;

public class Query
{
    
    private readonly IMongoCollection<FreelancerUser> _freelancerUsers;
    private readonly IMongoCollection<CustomerUser> _customerUsers;
    private readonly IMongoCollection<ExampleType> _exampleTable;
    
    private readonly FreelancerService _freelancerService;
    
    
    public Query(MongoDbService mongoDbService, 
        FreelancerService freelancerService)
    {
        _freelancerUsers = mongoDbService.GetCollection<FreelancerUser>("freelancerUser");
        _customerUsers = mongoDbService.GetCollection<CustomerUser>("customerUser");
        _exampleTable = mongoDbService.GetCollection<ExampleType>("exampleTable");
        _freelancerService = freelancerService;
    }

    
    /*
             * query {
          getFreelancers {
            message
            success
            freelancerUsers {
              // Füge hier die Eigenschaften von FreelancerUser ein, die abgefragt werden sollen,
              // z. B.:
              // id
              // name
              // email
            }
          }
        }
     */
    
    
    [GraphQLName("getAllFreelancers")]
    public async Task<GetFreelancersResponse> GetAllFreelancers() {
            
        var result = await _freelancerService.GetAllFreelancers();
        
        
        return result;
            
        /*
        return new GetFreelancersResponse {
            Message = "Freelancer erfolgreich geladen",
            Success = true,
            FreelancerUsers = new List<FreelancerUser>()
        };*/ 
        
    }
    
    
    [GraphQLName("getRandomFreelancers")]
    public async Task<GetFreelancersResponse> GetRandomFreelancers()
    {
        
        var result = await _freelancerService.GetRandomFreelancers();
        
        return result;
        
    }



    /*
    [GraphQLName("getExample")]
    public async Task<ResponseType> GetExample()
    {

        try
        {
            
            //await _exampleTable.InsertOneAsync(new ExampleType { Name = "Test Name 1" });
            
            var filter = Builders<ExampleType>.Filter.Empty;

            var exampleUsers = await _exampleTable.Find(filter).ToListAsync();
            var jsonResult = JsonConvert.SerializeObject(exampleUsers, Newtonsoft.Json.Formatting.Indented);
            
            Console.WriteLine("Example geladen");
            Console.WriteLine(jsonResult);
            
            return new ResponseType
            {
                Success = true,
                Message = "Example erfolgreich geladen"
            };


        }
        catch (Exception e)
        {
            
            
            return new ResponseType
            {
                Message = "Fehler",
                Success = false
            };
        }
        
        return new ResponseType
        {
           Message = "Erfolg",
           Success = true
        };
        
        
    }*/


    
    [GraphQLName("getCustomers")]
    public async Task<GetCustomersResponse> GetCustomers()
    {
        try
        {
            var filter = Builders<CustomerUser>.Filter.Empty;
            var customerUsers = await _customerUsers.Find(filter).ToListAsync();

            return new GetCustomersResponse
            {
                Message = "Erfolg",
                Success = true,
                CustomerUsers = customerUsers
            };

        }
        catch (Exception e)
        {
            return new GetCustomersResponse
            {
                Message = "Fehler beim Laden der Kunden",
                Success = false,
            };
        }
        
    }
    

    public Task<HelloResponse> Hello()
    {

        return Task.FromResult(new HelloResponse
        {
            Hello = "Hello World"
        });
        
    }
    


}