namespace API.Services
{
  public class JwtService(IConfiguration config) : IJwtService
  {
    public string Write(User user, string role, DateTime expires)
    {
      var claims = new List<Claim>
      {
       new("user", user.UserName!),
       new(ClaimTypes.Name, user.Name),
       new(ClaimTypes.Role, role)
      };

      var keyValue = config["JwtSettings:SecretKey"] ?? "";
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

      var tokenOptions = new JwtSecurityToken(
        issuer: config["JwtSettings:Issuer"],
        claims: claims,
        expires: expires,
        signingCredentials: creds
      );

      return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
    }
  }
}
