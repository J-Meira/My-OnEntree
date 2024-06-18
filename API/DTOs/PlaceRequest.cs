using Flunt.Extensions.Br.Validations;

namespace API.DTOs
{
  public class PlaceRequest : Notifiable<Notification>
  {
    public string Name { get; set; }
    public string Nickname { get; set; }
    public int TypeId { get; set; }
    public string Document { get; set; }
    public PlaceLocationRequest Location { get; set; }
    public PlaceContact Contact { get; set; }
    public List<string> Gates { get; set; }
    public List<string> Turnstiles { get; set; }
    public PlaceRequest(
      string name,
      string nickname,
      int typeId,
      string document,
      PlaceLocationRequest location,
      PlaceContact contact,
      List<string> gates,
      List<string> turnstiles
    )
    {
      Name = name;
      Nickname = nickname;
      TypeId = typeId;
      Document = document;
      Location = location;
      Contact = contact;
      Gates = gates;
      Turnstiles = turnstiles;
      Validate();
    }

    private void Validate()
    {
      var contract = new Contract<PlaceRequest>()
        .IsNotNullOrEmpty(Name, "Name", "Preenchimento Obrigatório")
        .IsGreaterOrEqualsThan(Name, 3, "Name", "Deve ter pelo menos 3 caracteres")
        .IsNotNull(TypeId, "TypeId", "Preenchimento Obrigatório")
        .IsGreaterThan(TypeId, 0, "TypeId", "Seleção inválida")
        .IsNotNullOrEmpty(Location.PostalCode, "Location.postalCode", "Preenchimento Obrigatório")
        .IsTrue(Location.PostalCode.Length == 8, "Location.postalCode", "Número inválido")
        .IsNotNull(Location.CityId, "Location.cityId", "Seleção Obrigatório")
        .IsGreaterThan(Location.CityId, 0, "Location.cityId", "Seleção inválida")
        .IsNotNullOrEmpty(Location.Address, "Location.address", "Preenchimento Obrigatório")
        .IsNotNullOrEmpty(Contact.Email, "Contact.email", "Preenchimento Obrigatório")
        .IsEmail(Contact.Email, "Contact.email", "Email Inválido")
        .IsGreaterThan(Gates, 0, "Gates", "Deve ter pelo menos uma entrada")
        .IsGreaterThan(Turnstiles, 0, "Turnstiles", "Deve ter pelo menos uma catraca");


      if (!string.IsNullOrWhiteSpace(Document))
        contract.IsCnpj(Document, "Document", "CNPJ inválido");

      if (!string.IsNullOrWhiteSpace(Contact.Phone))
        contract.IsTrue(Contact.Phone.Length == 10 || Contact.Phone.Length == 11, "Contact.phone", "Número inválido");

      AddNotifications(contract);
    }
  }

}
