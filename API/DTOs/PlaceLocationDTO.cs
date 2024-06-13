namespace API.DTOs
{
  public class PlaceLocationDTO
  {
    public int Id { get; set; }
    public string PostalCode { get; set; } = "";
    public CityDTO City { get; set; } = new();
    public string Address { get; set; } = "";
    public string Complement { get; set; } = "";
  }
}
