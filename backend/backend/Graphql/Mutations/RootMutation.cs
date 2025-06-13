using backend.Services;
using MongoDB.Bson;
using backend.Models;
using backend.Graphql.Types.Auth.AuthInputs;
using Microsoft.AspNetCore.Identity;
using backend.Graphql.Types;
using System.Threading.Tasks;
using System;
using MongoDB.Driver;


namespace backend.Graphql.Mutations;

public class RootMutation
{

    private readonly IMongoCollection<FreelancerUser> _freelancerUsers;
    private readonly IMongoCollection<CustomerUser> _customerUsers;
    
    //private readonly AuthenticationService _authenticationService;

    
    public RootMutation(/*AuthenticationService authenticationService,*/ MongoDbService mongoDbService)
    {
        //_authenticationService = authenticationService;
        
        _customerUsers = mongoDbService.GetCollection<CustomerUser>("customerUser");
        _freelancerUsers = mongoDbService.GetCollection<FreelancerUser>("freelancerUser");
    }


    [GraphQLName("login")]
    public async Task<LoginResponse> LoginUser(LoginInput loginData)
    {
        
        //await _authenticationService.LoginUser(loginData);
        
        return new LoginResponse
        {
            Message = "",
            Success = true,
            Token = ""
        };

    }


    [GraphQLName("register")]
    public async Task<Response> RegisterUser(RegisterInputUnion registerData, [Service] AuthenticationService authenticationService)
    {
        /*
        if (registerData is RegisterCustomerInput registerCustomerDataInput)
        {
            return new Response
            {
                Message = "",
                Success = true
            };

        } else if (registerData is RegisterFreelancerInput registerFreelancerDataInput)
        {
            return new Response
            {
                Message = "",
                Success = true
            };
        }
        else
        {
            return new Response
            {
                Message = "",
                Success = true
            };
        }
        */

        return registerData switch
        {
            RegisterCustomerInput customer =>
                await authenticationService.RegisterCustomerUser(new CustomerUser
                {
                    Id = customer.Id,
                    Username = customer.Username,
                    Email = customer.Email,
                    Password = customer.Password,
                }),

            RegisterFreelancerInput freelancer =>
                await authenticationService.RegisterFreelancerUser(new FreelancerUser
                {
                    Id = freelancer.Id,
                    Username = freelancer.Username,
                    Email = freelancer.Email,
                    Biography = freelancer.Biography,
                    Password = freelancer.Password,
                }),

            _ => new Response
            {
                Success = false,
                Message = "Invalid input type"
            }
        };
        
        return new Response
        {
            Message = "",
            Success = true
        };
        
    }
    
    
    
    /*
    [GraphQLName("register")]
    public async Task<Response> RegisterUser(RegisterInputUnion registerData)
    {

        if (registerData is RegisterCustomerInput registerCustomerDataInput)
        {

            try
            {
                var registerCustomerData = new CustomerUser
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Username = registerCustomerDataInput.Username,
                    Email = registerCustomerDataInput.Email,
                    Password = registerCustomerDataInput.Password,
                    PasswordConfirm = registerCustomerDataInput.ConfirmPassword
                };
                
                
                
                //await _authenticationService.RegisterCustomerUser(registerCustomerData);
                
                Console.WriteLine("User is Customer");

                if (registerCustomerData.Password == "" || registerCustomerData.Username == "" ||
                    registerCustomerData.Email == "" ||
                    registerCustomerData.PasswordConfirm == "")
                {


                    return new Response
                    {
                        Message = "Bitte füllen Sie alle Felder aus",
                        Success = false
                    };
                    
                    
                        
                }
                
                Console.WriteLine("Alle Felder ausgefüllt ");

                try
                {
                    var filter = Builders<CustomerUser>.Filter.Or(
                        Builders<CustomerUser>.Filter.Eq(user => user.Username, registerCustomerData.Username),
                        Builders<CustomerUser>.Filter.Eq(user => user.Email, registerCustomerData.Email)
                    );

                    var count = await _customerUsers.CountDocumentsAsync(filter);

                    if (count > 0)
                    {

                        return new Response
                        {
                            Message = "Username oder Email bereits vergeben",
                            Success = false
                        };

                       
                    }

                    var passwordHasher = new PasswordHasher<object>();

                    string hashedPassword = passwordHasher.HashPassword(null, registerCustomerData.Password);


                    var newFreelancerUser = new CustomerUser()
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        Username = registerCustomerData.Username,
                        Email = registerCustomerData.Email,
                        Password = registerCustomerData.Password,
                    };

                    await _customerUsers.InsertOneAsync(newFreelancerUser);

                    return new Response
                    {

                    };
                    
                    
                } catch (Exception e)
                {
                    return new Response
                    {
                        Success = false,
                        Message = "Fehler beim registrieren von Customer"
                    };
                }

            }
            catch (Exception e)
            {
                return new Response
                {
                    Message = "Fehler beim registrieren des Kunden",
                    Success = false
                };

            }



        }
        else if (registerData is RegisterFreelancerInput registerFreelancerDataInput)
        {
            try
            {
                Console.WriteLine("User is Freelancer");

                var registerFreelancerData = new FreelancerUser
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Username = registerFreelancerDataInput.Username,
                    Email = registerFreelancerDataInput.Email,
                    Password = registerFreelancerDataInput.Password,
                    PasswordConfirm = registerFreelancerDataInput.PasswordConfirm,
                    Biography = registerFreelancerDataInput.Biography,
                    Languages = registerFreelancerDataInput.Languages,
                    Services = registerFreelancerDataInput.Services
                };

                //var registerFreelancerData = registerFreelancerDataInput as FreelancerUser; 


                //var result = await _authenticationService.RegisterFreelancerUser(registerFreelancerData);

                
                Console.WriteLine("User is Freelancer: ", registerFreelancerData.Username);

                if (registerFreelancerData.Password == "" || registerFreelancerData.Username == ""
                                                  || registerFreelancerData.Email == "" || registerFreelancerData.Biography == "" ||
                                                  registerFreelancerData.Languages == "" )
                {

                    return new Response
                    {
                        Message = "Bitte füllen Sie alle Felder aus",
                        Success = false
                    };
            
            
            
                }


                try
                {
                    var filter = Builders<FreelancerUser>.Filter.Or(
                        Builders<FreelancerUser>.Filter.Eq(user => user.Username, registerFreelancerData.Username),
                        Builders<FreelancerUser>.Filter.Eq(user => user.Email, registerFreelancerData.Email)
                    );
        
                    var count = await _freelancerUsers.CountDocumentsAsync(filter);
        
                    if (count > 0)
                    {

                        return new Response
                        {
                            Message = "Username oder Email bereits vergeben",
                            Success = false
                        };

               
                    }

                    var passwordHasher = new PasswordHasher<object>();
        
                    string hashedPassword = passwordHasher.HashPassword(null, registerFreelancerData.Password);

                   
                    await _freelancerUsers.InsertOneAsync(registerFreelancerData);

                    return new Response
                    {
                        Success = true,
                        Message = "Freelancer Erfolgreich registriert"
                    };

            
                }
                catch (Exception e)
                {
                    return new Response
                    {
                        Success = false,
                        Message = "Fehler beim registrieren von Freelancer"
                    };
            
          
                }
                
                return new Response
                {
                    Message = "Freelancer registrieren",
                    Success = true
                };
            }
            catch (Exception e)
            {
                return new Response
                {
                    Message = "Fehler beim registrieren des Freelancers",
                    Success = false
                };
            }


            return new Response
            {
                Message = "Fehler beim registrieren des Freelancers",
                Success = false
            };

            
            
        }

        else
        {
            return new Response
            {
                Message = "Fehler beim registrieren des Freelancers",
                Success = false
            };
        }
        

    }

    */
    
    
    
    
    
    
}