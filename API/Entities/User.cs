namespace API.Entities
{
  public class User : IdentityUser<int>
  {
    public string Name { get; set; } = "";
  }
}
