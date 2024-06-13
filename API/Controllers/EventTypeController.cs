namespace API.Controllers
{
  public class EventTypeController(IGenericRepository repository) : BaseController
  {
    private readonly IGenericRepository _repository = repository;

    [HttpGet("GetAll")]
    public async Task<GetAllDTO<EventType>> GetAll()
    {
      return await _repository.GetAllEventTypes();
    }
  }
}
