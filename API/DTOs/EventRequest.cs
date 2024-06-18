namespace API.DTOs
{
  public class EventRequest : Notifiable<Notification>
  {
    public string Name { get; set; }
    public int TypeId { get; set; }
    public EventScheduleRequest Schedule { get; set; }
    public EventContact Contact { get; set; }
    public EventRequest(
      string name,
      int typeId,
      EventScheduleRequest schedule,
      EventContact contact
    )
    {
      Name = name;
      TypeId = typeId;
      Schedule = schedule;
      Contact = contact;
      Validate();
    }

    private void Validate()
    {
      var contract = new Contract<EventRequest>()
        .IsNotNullOrEmpty(Name, "Name", "Preenchimento Obrigatório")
        .IsGreaterOrEqualsThan(Name, 3, "Name", "Deve ter pelo menos 3 caracteres")
        .IsNotNull(TypeId, "TypeId", "Preenchimento Obrigatório")
        .IsGreaterThan(TypeId, 0, "TypeId", "Seleção inválida")
        .IsNotNull(Schedule.PlaceId, "Schedule.placeId", "Seleção Obrigatório")
        .IsGreaterThan(Schedule.PlaceId, 0, "Schedule.placeId", "Seleção inválida")
        .IsNotNull(Schedule.StartAt, "Schedule.startAt", "Preenchimento Obrigatório")
        .IsNotNull(Schedule.Duration, "Schedule.duration", "Preenchimento Obrigatório")
        .IsGreaterThan(Schedule.Duration, 1, "Schedule.duration", "Deve ter pelo menos uma hora de duração")
        .IsNotNullOrEmpty(Contact.Email, "Contact.email", "Preenchimento Obrigatório")
        .IsEmail(Contact.Email, "Contact.email", "Email Inválido");

      if (!string.IsNullOrWhiteSpace(Contact.Phone))
        contract.IsTrue(Contact.Phone.Length == 10 || Contact.Phone.Length == 11, "Contact.phone", "Número inválido");

      AddNotifications(contract);
    }
  }
}
