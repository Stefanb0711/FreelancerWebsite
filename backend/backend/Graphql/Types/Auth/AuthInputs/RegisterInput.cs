using backend.Models;

namespace backend.Graphql.Types.Auth.AuthInputs;

public class RegisterInput
{
    // Discriminator-Feld, um den Typ zu bestimmen
    public string InputType { get; set; } // Werte: "Customer" oder "Freelancer"

    // Gemeinsame Felder
    public string? Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    // Customer-spezifische Felder
    public string PasswordConfirm { get; set; }

    // Freelancer-spezifische Felder
    public string? Biography { get; set; }
    public string? Languages { get; set; }
    public Service[]? Services { get; set; }
    

}