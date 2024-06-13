namespace API.Controllers
{
  public class CityController(IGenericRepository repository) : BaseController
  {
    private readonly IGenericRepository _repository = repository;

    [HttpGet("Search")]
    public async Task<GetAllDTO<CityDTO>> Search([FromQuery] GetAllParams getAllParams)
    {
      return await _repository.SearchCities(getAllParams);
    }
  }
}
