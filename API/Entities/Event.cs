namespace API.Entities
{
  public class Event : Entity
  {
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public EventType Type { get; set; } = new();
    public EventSchedule Schedule { get; set; } = new();
    public EventContact Contact { get; set; } = new();
  }
}
