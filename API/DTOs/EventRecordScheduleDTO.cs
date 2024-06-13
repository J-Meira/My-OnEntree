namespace API.DTOs
{
  public class EventRecordScheduleDTO
  {
    public int Id { get; set; }
    public int PlaceId { get; set; } = new();
    public DateTime StartAt { get; set; }
    public double Duration { get; set; }
  }
}
