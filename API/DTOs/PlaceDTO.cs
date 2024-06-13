namespace API.DTOs
{
  public class PlaceDTO : EntityDTO
  {
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Nickname { get; set; } = "";
    public PlaceType Type { get; set; } = new();
    public string Document { get; set; } = "";
    public PlaceLocationDTO Location { get; set; } = new();
    public PlaceContact Contact { get; set; } = new();
    public List<string> Gates { get; set; } = [];
    public List<string> Turnstiles { get; set; } = [];
  }
}
