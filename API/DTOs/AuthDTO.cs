namespace API.DTOs
{
  public record AuthDTO
  (
    string AccessToken,
    DateTime ExpiresIn,
    UserDTO User
  );
}
