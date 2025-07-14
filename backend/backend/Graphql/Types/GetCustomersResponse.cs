using backend.Models;

namespace backend.Graphql.Types;

public class GetCustomersResponse
{
    public string Message { get; set; }
    
    public bool Success { get; set; }
    
    public List<CustomerUser>? CustomerUsers { get; set; }
}