namespace backend.Services;

public class TokenValidationMiddleware
{
    
    private readonly RequestDelegate _next;
    private readonly JwtTokenService _jwtTokenService;
    public TokenValidationMiddleware(RequestDelegate next, JwtTokenService jwtTokenService)
    {
        _next = next;
        _jwtTokenService = jwtTokenService;
    }
    
     public async Task Invoke(HttpContext context)
    {
        // Prüfen, ob die Anfrage eine GraphQL-Mutation ist
        if (context.Request.Path.StartsWithSegments("/graphql") && 
            context.Request.Method == "POST") // Prüfen für POST-Anfragen
        {

            
            if (await IsLoginOrRegisterMutationAsync(context))
            {
                Console.WriteLine("Login- oder Register-Mutation erkannt. Middleware übersprungen.");
                await _next(context);
                return;
            }
            
            // Authorization-Header prüfen
            var authorizationHeader = context.Request.Headers["Authorization"].FirstOrDefault();

            if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer"))
            {
                var token = authorizationHeader.Substring("Bearer ".Length).Trim();

                // Validieren des Tokens
                var claimsPrincipal = _jwtTokenService.ValidateToken(token);

                if (claimsPrincipal != null)
                {
                    Console.WriteLine("Token ist gültig.");
                    var userId = _jwtTokenService.GetUserIdFromJwt(token);

                    // Benutzer-ID dem HttpContext hinzufügen
                    context.Items["UserId"] = userId;

                    // Optional: Setze ClaimsPrincipal in HttpContext.User
                    context.User = claimsPrincipal;
                }
                else
                {
                    Console.WriteLine("Token ungültig oder abgelaufen.");
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Ungültiger oder abgelaufener Token. Zugriff verweigert.");
                    return; // Anfrage abbrechen
                }
            }
            else
            {
                Console.WriteLine("Authorization-Header fehlt oder ist ungültig.");
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Authorization-Header fehlt. Zugriff verweigert.");
                return; // Anfrage abbrechen
            }
        }

        // Nächste Middleware im Pipeline-Aufruf ausführen
        await _next(context);
    }

     
    private async Task<bool> IsLoginOrRegisterMutationAsync(HttpContext context)
    {
        if (context.Request.ContentType == "application/json")
        {
            context.Request.EnableBuffering();

            string body;
            
            //Console.WriteLine("Request Body in Middleware (assumably Login or Registermut): " + context.Request.Body.ToString());
            
            using (var reader = new StreamReader(context.Request.Body, leaveOpen: true))
            {
                body = await reader.ReadToEndAsync();
            }
            
            context.Request.Body.Position = 0;

            
            return body.Contains("mutation RegisterUser") || body.Contains("mutation LoginUser");
        }
        
        return false;
    }
    
    
}