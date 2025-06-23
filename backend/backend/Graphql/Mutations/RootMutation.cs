using backend.Services;
using MongoDB.Bson;
using backend.Models;
using backend.Graphql.Types.Auth.AuthInputs;
using Microsoft.AspNetCore.Identity;
using backend.Graphql.Types;
using System.Threading.Tasks;
using System;
using MongoDB.Driver;
using System.Text.Json.Serialization;


namespace backend.Graphql.Mutations;

public class RootMutation
{

    private readonly IMongoCollection<FreelancerUser> _freelancerUsers;
    private readonly IMongoCollection<CustomerUser> _customerUsers;
    
    private readonly AuthenticationService _authenticationService;
    private readonly JwtTokenService _jwtTokenService;
    
    public RootMutation(AuthenticationService authenticationService,
        MongoDbService mongoDbService,
        JwtTokenService jwtTokenService)
    {
        _authenticationService = authenticationService;
        _jwtTokenService = jwtTokenService;
        
        _customerUsers = mongoDbService.GetCollection<CustomerUser>("customerUser");
        _freelancerUsers = mongoDbService.GetCollection<FreelancerUser>("freelancerUser");
    }


    [GraphQLName("login")]
    public async Task<LoginResponse> LoginUser(LoginInput loginData)
    {           
        
        //await _authenticationService.LoginUser(loginData);

        if (loginData == null)
        {
            
            return new LoginResponse
            {
                Message = "Bitte geben Sie einen Benutzernamen und ein Passwort ein",
                Success = false,
                Token = null
            };
            
        }
      
        
        try {
            var freelancerFilter = Builders<FreelancerUser>.Filter.Or(
                Builders<FreelancerUser>.Filter.Eq(user => user.Username, loginData.UsernameOrEmail),
                Builders<FreelancerUser>.Filter.Eq(user => user.Email, loginData.UsernameOrEmail)
            );

            var customerFilter = Builders<CustomerUser>.Filter.Or(
                Builders<CustomerUser>.Filter.Eq(user => user.Username, loginData.UsernameOrEmail),
                Builders<CustomerUser>.Filter.Eq(user => user.Email, loginData.UsernameOrEmail)
            );
            

            if (freelancerFilter != null)
            {
                var freelancerUser = await _freelancerUsers.Find(freelancerFilter).FirstOrDefaultAsync();
                //var customerUser = await _customerUsers.Find()

                if (!string.IsNullOrEmpty(loginData.Password))
                {
                    
                    
                    
                    var passwordHasher = new PasswordHasher<FreelancerUser>();
                    
                   
                    
                    var result = passwordHasher.VerifyHashedPassword(
                        freelancerUser,
                        freelancerUser.Password,
                        loginData.Password);
                    
                    
                    if (result == PasswordVerificationResult.Success)
                    {
                        
                        Console.WriteLine("Sie sind erfolgreich eingeloggt");

                        var token = _jwtTokenService.GenerateToken(freelancerUser.Id, freelancerUser.Username,
                            loginData.Password);
                        
                        
                        return new LoginResponse
                        {
                            Message = "Login erfolgreich",
                            Success = true,
                            Token = token
                        };
                        
                        
                    }
                    
                    
                    
                }
                else
                {
                    
                    return new LoginResponse
                    {
                        Message = "Das Passwortfeld ist nicht ausgefüllt",
                        Success = false,
                        Token = null
                    };
                }

            } else if (customerFilter != null)
            {
                var customerUser = await _customerUsers.Find(customerFilter).FirstOrDefaultAsync();
                //var customerUser = await _customerUsers.Find()

                if (!string.IsNullOrEmpty(loginData.Password))
                {
                    var passwordHasher = new PasswordHasher<CustomerUser>();
                    
                    var result = passwordHasher.VerifyHashedPassword(
                        customerUser,
                        customerUser.Password,
                        loginData.Password);
                    
                    if (result == PasswordVerificationResult.Success)
                    {
                        
                        Console.WriteLine("Sie sind erfolgreich eingeloggt");

                        var token = _jwtTokenService.GenerateToken(customerUser.Id, customerUser.Username,
                            loginData.Password);
                        
                        
                        return new LoginResponse
                        {
                            Message = "Login erfolgreich",
                            Success = true,
                            Token = token
                        };
                        
                        
                    }
                    
                    
                    
                }
                else
                {
                    
                    return new LoginResponse
                    {
                        Message = "Das Passwortfeld ist nicht ausgefüllt",
                        Success = false,
                        Token = null
                    };
                }
                
                
            }
            else
            {
                return new LoginResponse
                {
                    Message = "Benutzer nicht gefunden",
                    Success = false,
                    Token = null
                };
            }
            
            
        }
        catch (Exception e)
        {
            
            return new LoginResponse
            {
                Message = "Fehler beim Login",
                Success = false,
                Token = null
            };
        }
        
        return new LoginResponse
        {
            Message = "",
            Success = true,
            Token = ""
        };

    }


    [GraphQLName("register")]
    public async Task<Response> RegisterUser(RegisterInput registrationData)
    {
        if (registrationData.InputType == "Customer")
        {
            var result = await _authenticationService.RegisterCustomerUser(registrationData);
            
            
            return result;
            
        } else if (registrationData.InputType == "Freelancer")
        {

            var result = await _authenticationService.RegisterFreelancerUser(registrationData);

            return result;
            
        }
        
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