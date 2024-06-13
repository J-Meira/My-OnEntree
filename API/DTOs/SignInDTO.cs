namespace API.DTOs
{
  public class SignInDTO : Notifiable<Notification>
  {
    public string UserName { get; set; }
    public string Password { get; set; }
    public SignInDTO(string userName, string password)
    {
      UserName = userName;
      Password = password;
      Validate();
    }

    private void Validate()
    {
      var contract = new Contract<SignInDTO>()
        .IsNotNullOrEmpty(UserName, "UserName", "Preenchimento Obrigatório")
        .IsNotNullOrEmpty(Password, "Password", "Preenchimento Obrigatório");

      AddNotifications(contract);
    }
  }
}
