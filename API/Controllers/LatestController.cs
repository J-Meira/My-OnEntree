namespace API.Controllers
{
  [Authorize(Roles = "Admin")]
  public class LatestController(IEventRepository eventRepository, IPlaceRepository placeRepository) : BaseController
  {
    private readonly IEventRepository _eventRepository = eventRepository;
    private readonly IPlaceRepository _placeRepository = placeRepository;
    [HttpGet]
    public async Task<LatestDTO> GetAll()
    {
      var events = await _eventRepository.GetAll(new GetAllEventsParams
      {
        Limit = 3,
        OrderBy = "-createdAt",
      });
      var places = await _placeRepository.GetAll(new GetAllParams
      {
        Limit = 3,
        OrderBy = "-createdAt",
      });

      return new LatestDTO(places.Records, events.Records);
    }
  }
}
