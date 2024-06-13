namespace API.DTOs
{
  public class SignUpDTO : Notifiable<Notification>
  {
    public string Name { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public SignUpDTO(string name, string email, string userName, string password)
    {
      Name = name;
      Email = email;
      UserName = userName;
      Password = password;
      Validate();
    }

    private void Validate()
    {
      var contract = new Contract<SignUpDTO>()
        .IsNotNullOrEmpty(Name, "Name", "Preenchimento Obrigatório")
        .IsGreaterOrEqualsThan(Name, 3, "Name", "Deve ter pelo menos 3 caracteres.")
        .IsNotNullOrEmpty(Email, "Email", "Preenchimento Obrigatório")
        .IsEmail(Email, "Email", "Email Inválido")
        .IsNotNullOrEmpty(UserName, "UserName", "Preenchimento Obrigatório")
        .IsGreaterOrEqualsThan(UserName, 3, "UserName", "Deve ter pelo menos 3 caracteres.")
        .IsNotNullOrEmpty(Password, "Password", "Preenchimento Obrigatório")
        .IsGreaterOrEqualsThan(Password, 8, "Password", "Deve ter pelo menos 10 caracteres.")
        .IsTrue(Password.Any(char.IsDigit), "Password", "Deve conter pelo menos um numero")
        .IsTrue(Password.Any(char.IsLower), "Password", "Deve conter pelo menos uma letra minúscula")
        .IsTrue(Password.Any(char.IsUpper), "Password", "Deve conter pelo menos uma letra maiúscula")
        .IsTrue(Password.Any(ch => !char.IsLetterOrDigit(ch)), "Password", "Deve conter pelo menos caractere especial");

      AddNotifications(contract);
    }
  }
}
