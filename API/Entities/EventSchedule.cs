namespace API.Entities
{
  [Table("EventSchedules")]
  public class EventSchedule
  {
    public int Id { get; set; }
    public Place Place { get; set; } = new();
    public DateTime StartAt { get; set; }
    public DateTime EndAt { get; set; }
  }
}
