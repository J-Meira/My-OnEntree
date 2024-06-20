namespace API.DTOs
{
  public class GetAllEventsParams : GetAllParams
  {
    public DateTime? DateStart { get; set; }
    public DateTime? DateEnd { get; set; }
    public int? PlaceId { get; set; }
  }
}
