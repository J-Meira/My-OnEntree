namespace API.DTOs
{
  public class EventScheduleRequest
  {
    public int Id { get; set; }
    public int PlaceId { get; set; } = new();
    public DateTime StartAt { get; set; }
    public double Duration { get; set; }
  }
}
