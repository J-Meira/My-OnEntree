namespace API.Entities
{
  [Table("PlaceLocations")]
  public class PlaceLocation
  {
    public int Id { get; set; }
    public string PostalCode { get; set; } = "";
    public City City { get; set; } = new();
    public string Address { get; set; } = "";
    public string Complement { get; set; } = "";
  }
}
