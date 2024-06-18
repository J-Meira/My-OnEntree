namespace API.Controllers
{
  [Authorize(Roles = "Admin")]
  public class EventController(IEventRepository repository) : BaseController
  {
    private readonly IEventRepository _repository = repository;

    [HttpGet("GetAll")]
    public async Task<GetAllDTO<EventDTO>> GetAll([FromQuery] GetAllEventsParams getAllParams)
    {
      return await _repository.GetAll(getAllParams);
    }

    [HttpGet("GetById/{id}")]
    public async Task<ActionResult<EventDTO>> GetById(int id)
    {
      var record = await _repository.GetById(id);

      return record is null ? NotFound() : record;
    }

    [HttpPost("Create")]
    public async Task<ActionResult> Create(EventRequest dto)
    {
      if (User.Identity is null || User.Identity.Name is null)
      {
        return Unauthorized();
      }
      var userName = User.Identity.Name;
      var result = await _repository.Create(dto, userName);
      if (!result.Succeeded && result.Errors is not null)
      {
        if (result.Errors.First().Key == "BadRequest")
        {
          return BadRequest(new ProblemDetails
          {
            Title = result.Errors.First().Message
          });
        }
        else
        {
          foreach (var item in result.Errors)
          {
            ModelState.AddModelError(item.Key, item.Message);
          }
          return ValidationProblem();
        }
      }
      return CreatedAtAction(nameof(GetById), new { id = result.Value }, result.Value);
    }

    [HttpPut("UpdateById/{id}")]
    public async Task<ActionResult> UpdateById(EventRequest dto, int id)
    {
      if (User.Identity is null || User.Identity.Name is null)
      {
        return Unauthorized();
      }

      var userName = User.Identity.Name;
      var result = await _repository.UpdateById(dto, id, userName);
      if (!result.Succeeded && result.Errors is not null)
      {
        if (result.Errors.First().Key == "BadRequest")
        {
          return BadRequest(new ProblemDetails
          {
            Title = result.Errors.First().Message
          });
        }
        else
        {
          foreach (var item in result.Errors)
          {
            ModelState.AddModelError(item.Key, item.Message);
          }
          return ValidationProblem();
        }
      }
      return result.Succeeded ? Ok() : NotFound();
    }

    [HttpDelete("DeleteById/{id}")]
    public async Task<ActionResult> DeleteById(int id)
    {
      var result = await _repository.DeleteById(id);

      if (!result.Succeeded && result.Errors is not null)
      {
        return BadRequest(new ProblemDetails
        {
          Title = result.Errors.First().Message
        });
      }
      return result.Succeeded ? Ok() : NotFound();
    }
  }
}
