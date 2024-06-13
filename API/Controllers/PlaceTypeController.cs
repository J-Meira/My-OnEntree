namespace API.Controllers
{
  public class PlaceTypeController(IGenericRepository repository) : BaseController
  {
    private readonly IGenericRepository _repository = repository;

    [HttpGet("GetAll")]
    public async Task<GetAllDTO<PlaceType>> GetAll()
    {
      return await _repository.GetAllPlaceTypes();
    }
  }
}
