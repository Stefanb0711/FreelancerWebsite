using backend.Models;

namespace backend.Graphql.Types;

public class GetFreelancersResponse
{
    public string Message { get; set; }
    public bool Success { get; set; }
    public List<FreelancerUser>? FreelancerUsers { get; set; }
    
}