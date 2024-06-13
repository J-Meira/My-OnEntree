namespace API.Entities
{
  [Table("PlaceContacts")]
  public class PlaceContact : Contact
  {
    public int Id { get; set; }
  }
}
