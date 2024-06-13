namespace API.Data.Repositories
{
  public interface IAuthRepository
  {
    public Task<TaskResult<AuthDTO>> Refresh(string userName);
    public Task<TaskResult<AuthDTO>> SignIn(SignInDTO dto);
    public Task<TaskResult<int>> SignUp(SignUpDTO dto);

  }
}
