namespace API.DTOs
{
  public class PlaceRecordLocationDTO
  {
    public int Id { get; set; }
    public string PostalCode { get; set; } = "";
    public int CityId { get; set; }
    public string Address { get; set; } = "";
    public string Complement { get; set; } = "";
  }
}
