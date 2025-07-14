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
    
    public Query(MongoDbService mongoDbService)
    {
        _freelancerUsers = mongoDbService.GetCollection<FreelancerUser>("freelancerUser");
        _customerUsers = mongoDbService.GetCollection<CustomerUser>("customerUser");
        _exampleTable = mongoDbService.GetCollection<ExampleType>("exampleTable");
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
    
    
    [GraphQLName("getFreelancers")]
    public async Task<GetFreelancersResponse> GetFreelancers()
    {
        try
        {
            
            
            Console.WriteLine("Vor dem Filter");
            
            var filter = Builders<FreelancerUser>.Filter.Empty;
            
            var freelancerUsers = await _freelancerUsers.Find(filter).ToListAsync();
            
            var jsonResult = JsonConvert.SerializeObject(freelancerUsers, Newtonsoft.Json.Formatting.Indented);
            
            
            Console.WriteLine("Freelancer geladen");
            Console.WriteLine(jsonResult);
            
            if (freelancerUsers.Count == 0)
            {
                Console.WriteLine("Die Collection ist leer oder die Abfrage liefert keine Daten.");
            }
            else
            {

                Console.WriteLine("Ergebnisse im Json-Format:");
                Console.WriteLine(jsonResult);
            }
            
            /*
            foreach (var freelancer in freelancerUsers)
            {
                Console.WriteLine($"Email: {freelancer.Email}");
            }*/
            
            return new GetFreelancersResponse
            {
                Message = "Freelancer erfolgreich geladen",
                Success = true,
                FreelancerUsers = freelancerUsers
            };
            
        }
        catch (Exception e)
        {
            return new GetFreelancersResponse
            {
                Message = "Fehler beim Laden der Freelancer",
                Success = false,
            };
        }
        

    }




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
        
        
    }
    
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
    


    
    //public string HelloWorld() => "Hallo Welt!";
    
    
}