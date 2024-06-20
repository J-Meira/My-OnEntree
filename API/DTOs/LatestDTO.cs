namespace API.DTOs
{
  public record LatestDTO(
    List<PlaceDTO> Places,
    List<EventDTO> Events
  );
}
