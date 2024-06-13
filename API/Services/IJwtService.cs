namespace API.Services
{
  public interface IJwtService
  {
    public string Write(User user, string role, DateTime expires);
  }
}
