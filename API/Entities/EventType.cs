namespace API.Entities
{
  [Table("EventTypes")]
  public class EventType
  {
    public int Id { get; set; }
    public string Label { get; set; } = "";
  }
}
