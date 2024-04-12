using API.BLL.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.BLL.Services.Implementations;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string CreateToken(params string[] claims)
    {
        var claimsToStore = claims
            .Select(c => new Claim(ClaimTypes.UserData, c))
            .ToList();

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetSection("Jwt:SigningKey").Value!));

        var singningCreds = new SigningCredentials(securityKey,
            SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claimsToStore),
            Expires = DateTime.Now.AddHours(1),
            SigningCredentials = singningCreds,
            Issuer = _configuration.GetSection("Jwt:Issuer").Value!,
            Audience = _configuration.GetSection("Jwt:Audience").Value!
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
