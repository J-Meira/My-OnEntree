namespace API.Entities
{
  public class Place : Entity
  {
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Nickname { get; set; } = "";
    public PlaceType Type { get; set; } = new();
    public string Document { get; set; } = "";
    public PlaceLocation Location { get; set; } = new();
    public PlaceContact Contact { get; set; } = new();
    public List<string> Gates { get; set; } = [];
    public List<string> Turnstile { get; set; } = [];
  }
}
