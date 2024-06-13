namespace API.Controllers.SIGEP
{
  public class StateController(IGenericRepository repository) : BaseController
  {
    private readonly IGenericRepository _repository = repository;

    [HttpGet("GetAll")]
    public async Task<GetAllDTO<State>> GetAll()
    {
      return await _repository.GetAllStates();
    }
  }
}
