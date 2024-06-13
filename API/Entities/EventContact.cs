namespace API.Entities
{
  [Table("EventContacts")]
  public class EventContact : Contact
  {
    public int Id { get; set; }
  }
}
