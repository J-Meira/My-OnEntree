namespace API.DTOs
{
  public class EventDTO : Entity
  {
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public EventType Type { get; set; } = new();
    public EventScheduleDTO Schedule { get; set; } = new();
    public EventContact Contact { get; set; } = new();
  }
}
