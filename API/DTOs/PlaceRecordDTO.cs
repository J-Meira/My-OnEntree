using Flunt.Extensions.Br.Validations;

namespace API.DTOs
{
  public class PlaceRecordDTO : Notifiable<Notification>
  {
    public string Name { get; set; }
    public string Nickname { get; set; }
    public int TypeId { get; set; }
    public string Document { get; set; }
    public PlaceRecordLocationDTO Location { get; set; }
    public PlaceContact Contact { get; set; }
    public List<string> Gates { get; set; }
    public List<string> Turnstile { get; set; }
    public PlaceRecordDTO(
      string name,
      string nickname,
      int typeId,
      string document,
      PlaceRecordLocationDTO location,
      PlaceContact contact,
      List<string> gates,
      List<string> turnstile
    )
    {
      Name = name;
      Nickname = nickname;
      TypeId = typeId;
      Document = document;
      Location = location;
      Contact = contact;
      Gates = gates;
      Turnstile = turnstile;
      Validate();
    }

    private void Validate()
    {
      var contract = new Contract<PlaceRecordDTO>()
        .IsNotNullOrEmpty(Name, "Name", "Preenchimento Obrigatório")
        .IsGreaterOrEqualsThan(Name, 3, "Name", "Deve ter pelo menos 3 caracteres")
        .IsNotNullOrEmpty(Nickname, "Nickname", "Preenchimento Obrigatório")
        .IsGreaterOrEqualsThan(Nickname, 3, "Nickname", "Deve ter pelo menos 3 caracteres")
        .IsNotNull(TypeId, "TypeId", "Preenchimento Obrigatório")
        .IsGreaterThan(TypeId, 0, "TypeId", "Seleção inválida")
        .IsNotNullOrEmpty(Document, "Document", "Preenchimento Obrigatório")
        .IsCnpj(Document, "Document", "CNPJ inválido")
        .IsNotNullOrEmpty(Location.PostalCode, "Location.postalCode", "Preenchimento Obrigatório")
        .IsTrue(Location.PostalCode.Length == 8, "Location.postalCode", "Número inválido")
        .IsNotNull(Location.CityId, "Location.cityId", "Seleção Obrigatório")
        .IsGreaterThan(Location.CityId, 0, "Location.cityId", "Seleção inválida")
        .IsNotNullOrEmpty(Location.Address, "Location.address", "Preenchimento Obrigatório")
        .IsNotNullOrEmpty(Contact.Phone, "Contact.phone", "Preenchimento Obrigatório")
        .IsTrue(Contact.Phone.Length == 10 || Contact.Phone.Length == 11, "Contact.phone", "Número inválido")
        .IsNotNullOrEmpty(Contact.Email, "Contact.email", "Preenchimento Obrigatório")
        .IsEmail(Contact.Email, "Contact.email", "Email Inválido")
        .IsGreaterThan(Gates, 0, "Gates", "Deve ter pelo menos uma entrada")
        .IsGreaterThan(Turnstile, 0, "Turnstile", "Deve ter pelo menos uma catraca");

      AddNotifications(contract);
    }
  }

}
