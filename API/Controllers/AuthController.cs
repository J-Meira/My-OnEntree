namespace API.Controllers
{
  [Authorize(Roles = "Admin")]
  public class AuthController(IAuthRepository repository) : BaseController
  {
    private readonly IAuthRepository _repository = repository;

    [AllowAnonymous]
    [HttpPost("SignUp")]
    public async Task<ActionResult> SignUp(SignUpDTO dto)
    {
      var result = await _repository.SignUp(dto);
      if (!result.Succeeded)
      {
        foreach (var item in result.Errors!)
        {
          ModelState.AddModelError(item.Key, item.Message);
        }
        return ValidationProblem();
      }
      return Ok();

    }

    [AllowAnonymous]
    [HttpPost("SignIn")]
    public async Task<ActionResult<AuthDTO>> SignIn(SignInDTO dto)
    {
      var result = await _repository.SignIn(dto);
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
      return result.Value!;
    }

    [HttpPost("Refresh")]
    public async Task<ActionResult<AuthDTO>> Refresh()
    {
      var useId = User.FindFirstValue("user");
      if (useId is null)
      {
        return Unauthorized();
      }
      var result = await _repository.Refresh(useId);
      return result.Value is null ? Unauthorized() : result.Value;
    }

  }
}
