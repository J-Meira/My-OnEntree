namespace API.Data.Repositories
{
  public class AuthRepository(
    IMapper mapper,
    IJwtService jwtService,
    UserManager<User> userManager
  ) : IAuthRepository
  {
    private readonly IMapper _mapper = mapper;
    private readonly IJwtService _jwtService = jwtService;
    private readonly UserManager<User> _userManager = userManager;
    private readonly int _hourToAdd = 24;

    public async Task<TaskResult<AuthDTO>> Refresh(string userName)
    {
      var user = await _userManager.FindByNameAsync(userName);
      if (user is null)
      {
        return new TaskResult<AuthDTO>(false);
      }
      var expires = DateTime.UtcNow.AddHours(_hourToAdd);
      var accessToken = _jwtService.Write(user, "Admin", expires);

      return new TaskResult<AuthDTO>(
        new AuthDTO(
          accessToken,
          expires,
          _mapper.Map<UserDTO>(user)
        )
      );
    }

    public async Task<TaskResult<AuthDTO>> SignIn(SignInDTO dto)
    {
      if (!dto.IsValid)
      {
        return new TaskResult<AuthDTO>(dto.Notifications);
      }

      var user = await _userManager.FindByNameAsync(dto.UserName);
      if (user is null)
      {
        return new TaskResult<AuthDTO>(new TaskError("BadRequest", "Login ou senha inválidos"));
      }

      if (!await _userManager.CheckPasswordAsync(user, dto.Password))
      {
        return new TaskResult<AuthDTO>(new TaskError("BadRequest", "Login ou senha inválidos"));
      }

      var expires = DateTime.UtcNow.AddHours(_hourToAdd);
      var accessToken = _jwtService.Write(user, "Admin", expires);

      return new TaskResult<AuthDTO>(
        new AuthDTO(
          accessToken,
          expires,
          _mapper.Map<UserDTO>(user)
        )
      );
    }

    public async Task<TaskResult<int>> SignUp(SignUpDTO dto)
    {
      if (!dto.IsValid)
      {
        return new TaskResult<int>(dto.Notifications);
      }

      var user = new User()
      {
        Name = dto.Name,
        Email = dto.Email,
        UserName = dto.UserName,
      };

      var result = await _userManager.CreateAsync(user, dto.Password);

      if (!result.Succeeded)
      {
        return new TaskResult<int>(result.Errors);
      }

      await _userManager.AddToRolesAsync(user, new[] { "Admin" });

      return new TaskResult<int>(user.Id);
    }
  }
}
