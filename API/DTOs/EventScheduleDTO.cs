namespace API.DTOs
{
  public class EventScheduleDTO
  {
    public int Id { get; set; }
    public PlaceDTO Place { get; set; } = new();
    public DateTime StartAt { get; set; }
    public DateTime EndAt { get; set; }
  }
}
