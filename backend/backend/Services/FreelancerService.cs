using backend.Graphql.Types;
using MongoDB.Driver;
using backend.Models;
using MongoDB.Bson;


namespace backend.Services;

public class FreelancerService
{

    private readonly MongoDbService _mongoDbService;
    private readonly IMongoCollection<FreelancerUser> _freelancerUsers;
    
    public FreelancerService(MongoDbService mongoDbService)
    {
        _freelancerUsers = mongoDbService.GetCollection<FreelancerUser>("freelancerUser");
    }

    public async Task<GetFreelancersResponse> GetAllFreelancers()
    {
        try
        {
            
            
            
            var filter = Builders<FreelancerUser>.Filter.Empty;
            
            
            var freelancerUsers = await _freelancerUsers.Find(filter).ToListAsync();
            
            
            
            
            if (freelancerUsers.Count == 0) {
                return new GetFreelancersResponse {
                    Message = "Keine Freelancer gefunden",
                    Success = false,  
                };
            }
            
            
            /*
            return new GetFreelancersResponse {
                Message = "Freelancer erfolgreich geladen",
                Success = true,
                FreelancerUsers = randomFreelancers
            };*/
            
            
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
    
    public async Task<GetFreelancersResponse> GetRandomFreelancers()
    {
        try
        {
            
            var filter = Builders<FreelancerUser>.Filter.Empty;
            
            
            var freelancerUsers = await _freelancerUsers.Find(filter).ToListAsync();
            
            
            
            
            if (freelancerUsers.Count == 0) {
                return new GetFreelancersResponse {
                    Message = "Keine Freelancer gefunden",
                    Success = false,  
                };
            }
            
            var random = new Random();
            var randomFreelancers = freelancerUsers.OrderBy(_ => random.Next()).Take(3).ToList();
            
            Console.WriteLine("Random Freelancers:" + randomFreelancers.ToString());
            
            /*
            return new GetFreelancersResponse {
                Message = "Freelancer erfolgreich geladen",
                Success = true,
                FreelancerUsers = randomFreelancers
            };*/
            
            
            return new GetFreelancersResponse
            {
                Message = "Freelancer erfolgreich geladen",
                Success = true,
                FreelancerUsers = randomFreelancers
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
    
}