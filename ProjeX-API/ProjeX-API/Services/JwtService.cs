using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using DotNetEnv;

namespace ProjeX_API.Services
{
    public static class JwtService
    {
        private static int TokenExpiryInMinutes = 300; // Set token expiry time to 300 minutes

        public static string GenerateToken(int userId)
        {
            Env.Load();
            var secretKey = Environment.GetEnvironmentVariable("TOKEN_SECRET_KEY");
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userId.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(TokenExpiryInMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            try
            {
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                // Handle key generation errors
                throw new ApplicationException("Failed to generate JWT token", ex);
            }
        }
    }
}
