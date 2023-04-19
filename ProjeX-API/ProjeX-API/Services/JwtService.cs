using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using DotNetEnv;

// Load environment variables from .env file

namespace ProjeX_API.Services
{
    public static class JwtService
    {

        private static string SecretKey = Environment.GetEnvironmentVariable("TOKEN_SECRET_KEY"); // Replace with your own secret key
        private static int TokenExpiryInMinutes = 300; // Set token expiry time to 300 minutes

        public static string GenerateToken(int userId)
        {
            Env.Load();
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new byte[64];

            // Generate a random key
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(key);
            }

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
