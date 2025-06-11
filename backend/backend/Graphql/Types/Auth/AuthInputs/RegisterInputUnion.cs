using backend.Graphql.Types.Auth.AuthInputs;
using backend.Models;
using MongoDB.Bson;


namespace backend.Graphql.Types.Auth.AuthInputs;

//Abstract class kann nicht direkt instaanziert werden
//Erlaubt, dass ein Feld mehr als nur einen Typ zurückgeben kann
[UnionType]
public abstract class RegisterInputUnion
{
    
    
}


public class RegisterCustomerInput: RegisterInputUnion
{
    public string Id { get; set; }
    public string Username { get; set; }
    
    public string Email { get; set; }
    
    public string Password { get; set; }    
    
    public string ConfirmPassword { get; set; }
}



public class ServiceType
{
    public string Name { get; set; }   
    public int Price { get; set; }
}

public class RegisterFreelancerInput : RegisterInputUnion
{
    public string Id { get; set; }
    public string Email { get; set;}
    public string Username { get; set;}
    
    public string Biography { get; set;}
    
    public string Languages { get; set;}
    
    public Service[] Services {get; set;}
    
    public string Password { get; set; }
    
    public string PasswordConfirm { get; set; }
    
}



/*
public class RegisterInputUnion : UnionGraphType
{


    public RegisterInputUnion()
    {
        Type(typeof(RegisterCustomerInput));
        Type(typeof(RegisterFreelancerInput));
    }
  
}
*/