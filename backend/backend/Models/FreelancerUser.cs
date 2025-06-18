namespace backend.Models;

public class FreelancerUser
{
    public string Id { get; set; }
    public string Username { get; set; }
    
    public string Email { get; set; }
    
    public string Biography { get; set; }
    
    public string Languages { get; set; }
    
    public Service[] Services { get; set; }
    
    public string Password;
    
}