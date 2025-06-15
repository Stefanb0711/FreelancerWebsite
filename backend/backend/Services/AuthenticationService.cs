using backend.Graphql.Types;
using backend.Graphql.Types.Auth.AuthInputs;
using backend.Services;
using MongoDB.Bson;
using backend.Models;
using backend.Graphql.Types.Auth.AuthInputs;
using Microsoft.AspNetCore.Identity;
using backend.Graphql.Types;
using System.Threading.Tasks;
using System;
using MongoDB.Driver;
using backend.Models;


namespace backend.Services;

public class AuthenticationService
{
    
    private readonly IMongoCollection<FreelancerUser> _freelancerUsers;
    private readonly IMongoCollection<CustomerUser> _customerUsers;
    
    
    public AuthenticationService(
        MongoDbService mongoDbService)
    {
        _customerUsers = mongoDbService.GetCollection<CustomerUser>("customerUser");
        _freelancerUsers = mongoDbService.GetCollection<FreelancerUser>("freelancerUser");
    }



    public async Task<Response> RegisterCustomerUser(RegisterInput customerUser)
    {
                Console.WriteLine("User is Customer");

                if (customerUser.Password == "" || customerUser.Username == "" ||
                    customerUser.Email == "" ||
                    customerUser.PasswordConfirm == "")
                {

                
                    return new Response
                    {
                        Message = "Bitte füllen Sie alle Felder aus",
                        Success = false
                    };
                    
                    /*
                    return Task.FromResult(new Response
                    {
                        Message = "Bitte füllen Sie alle Felder aus",
                        Success = false
                    });*/
                        
                }
                
                Console.WriteLine("Alle Felder ausgefüllt ");

                try
                {
                    var filter = Builders<CustomerUser>.Filter.Or(
                        Builders<CustomerUser>.Filter.Eq(user => user.Username, customerUser.Username),
                        Builders<CustomerUser>.Filter.Eq(user => user.Email, customerUser.Email)
                    );

                    var count = await _customerUsers.CountDocumentsAsync(filter);

                    if (count > 0)
                    {

                        return new Response
                        {
                            Message = "Username oder Email bereits vergeben",
                            Success = false
                        };

                        /*
                        return Task.FromResult(new Response
                        {

                        });
                        */
                    }

                    var passwordHasher = new PasswordHasher<object>();

                    string hashedPassword = passwordHasher.HashPassword(null, customerUser.Password);


                    var newCustomerUser = new CustomerUser()
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        Username = customerUser.Username,
                        Email = customerUser.Email,
                        Password = customerUser.Password,
                    };

                    await _customerUsers.InsertOneAsync(newCustomerUser);

                    return new Response
                    {
                        Message = "Customer erfolgreich registriert",
                        Success = true
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

    public async Task<Response> RegisterFreelancerUser(RegisterInput freelancerUser)
    {
        Console.WriteLine("User is Freelancer: ", freelancerUser.Username);

        if (freelancerUser.Password == "" || freelancerUser.Username == ""
            || freelancerUser.Email == "" || freelancerUser.Biography == "" ||
            freelancerUser.Languages == "" )
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
                Builders<FreelancerUser>.Filter.Eq(user => user.Username, freelancerUser.Username),
                Builders<FreelancerUser>.Filter.Eq(user => user.Email, freelancerUser.Email)
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
        
            string hashedPassword = passwordHasher.HashPassword(null, freelancerUser.Password);

            
            Console.WriteLine("Gehastes Passwort" + hashedPassword);

            var newFreelancerUser = new FreelancerUser()
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Username = freelancerUser.Username,
                Email = freelancerUser.Email,
                Password = freelancerUser.Password,
                Biography = freelancerUser.Biography,
                Languages = freelancerUser.Languages,
                Services = freelancerUser.Services
            };
            
            Console.WriteLine("Neuer Freelancerusertyp umgewandelt" + newFreelancerUser.Id);
        
            await _freelancerUsers.InsertOneAsync(newFreelancerUser);

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
        
        
        
    }
    
    public async Task<Response> RegisterUser(RegisterInputUnion registerData)
    {
         try
        {
            
             if (registerData is RegisterCustomerInput registerCustomerData)
            {
                
                
                Console.WriteLine("User is Customer");

                if (registerCustomerData.Password == "" || registerCustomerData.Username == "" ||
                    registerCustomerData.Email == "" ||
                    registerCustomerData.ConfirmPassword == "")
                {


                    return new Response
                    {
                        Message = "Bitte füllen Sie alle Felder aus",
                        Success = false
                    };
                    
                    /*
                    return Task.FromResult(new Response
                    {
                        Message = "Bitte füllen Sie alle Felder aus",
                        Success = false
                    });*/
                        
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
                        
                        /*
                        return Task.FromResult(new Response
                        {
                            
                        });
                        */
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
                
                    _customerUsers.InsertOneAsync(newFreelancerUser);
                    
                    return new Response
                    {
                        Success = true,
                        Message = "Customer erfolgreich registriert"
                    };
                        
                    /*
                    return Task.FromResult(new Response
                    {
                        Success = true,
                        Message = "Customer erfolgreich registriert"
                    });
                    */
                }
                catch (Exception e)
                {
                    return new Response
                    {
                        Success = false,
                        Message = "Fehler beim registrieren von Customer"
                    };
                    
                    /*
                    return Task.FromResult(new Response
                    {
                        Success = false,
                        Message = "Fehler beim registrieren von Customer"
                    });
                    */
                }
                
                
            }
           
            else if (registerData is RegisterFreelancerInput registerFreelancerData)
            {
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
                    
                    /*
                    return Task.FromResult(new Response
                    {
                        Message = "Bitte füllen Sie alle Felder aus",
                        Success = false
                    });
                    */
                    
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

                        /*
                        return Task.FromResult(new Response
                        {
                            Message = "Username oder Email bereits vergeben",
                            Success = false
                        });*/
                    }

                    var passwordHasher = new PasswordHasher<object>();
                
                    string hashedPassword = passwordHasher.HashPassword(null, registerFreelancerData.Password);


                    var newFreelancerUser = new FreelancerUser()
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        Username = registerFreelancerData.Username,
                        Email = registerFreelancerData.Email,
                        Password = registerFreelancerData.Password,
                        Biography = registerFreelancerData.Biography,
                        Languages = registerFreelancerData.Languages,
                        Services = registerFreelancerData.Services
                    };
                
                    await _freelancerUsers.InsertOneAsync(newFreelancerUser);

                    return new Response
                    {
                        Success = true,
                        Message = "Freelancer Erfolgreich registriert"
                    };

                    /*
                    return Task.FromResult(new Response
                    {
                        Success = true,
                        Message = "Freelancer Erfolgreich registriert"
                    });*/
                }
                catch (Exception e)
                {
                    return new Response
                    {
                        Success = false,
                        Message = "Fehler beim registrieren von Freelancer"
                    };
                    
                    /*
                    return Task.FromResult(new Response
                    {
                        Success = false,
                        Message = "Fehler beim registrieren von Freelancer"
                    });
                    */
                }
                
                
            }
             
             
            
        }
        catch (Exception e)
        {

            return new Response
            {
                Message = "Fehler beim registrieren",
                Success = true
            };
            
            /*
            return Task.FromResult(new Response
            {
                Message = "Fehler beim registrieren",
                Success = true,
            });*/
            
        }

        return new Response
        {
            Message = "Fehler beim registrieren",
            Success = false
        };

    }


    public async Task<LoginResponse> LoginUser(LoginInput loginData)
    {
        return new LoginResponse
        {
            
        };
    }
    
}