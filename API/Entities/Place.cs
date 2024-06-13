namespace API.Entities
{
  public class Place : Entity
  {
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Nickname { get; set; } = "";
    public PlaceType Type { get; set; } = new();
    public string Document { get; set; } = "";
    public PlaceLocation Location { get; set; } = new();
    public PlaceContact Contact { get; set; } = new();
    public List<string> Gates { get; set; } = [];
    public List<string> Turnstiles { get; set; } = [];

    public void Update(PlaceRecordDTO dto, string updatedBy)
    {
      Name = dto.Name;
      Nickname = dto.Nickname;
      Document = dto.Document;
      Location.Address = dto.Location.Address;
      Location.PostalCode = dto.Location.PostalCode;
      Location.Complement = dto.Location.Complement;
      Contact.Phone = dto.Contact.Phone;
      Contact.Email = dto.Contact.Email;
      Gates = dto.Gates;
      Turnstiles = dto.Turnstiles;
      UpdatedAt = DateTime.UtcNow;
      UpdatedBy = updatedBy;
    }
  }
}
