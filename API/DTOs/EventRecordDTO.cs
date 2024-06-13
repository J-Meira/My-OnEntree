
namespace API.DTOs
{
  public class EventRecordDTO : Notifiable<Notification>
  {
    public string Name { get; set; }
    public int TypeId { get; set; }
    public EventRecordScheduleDTO Schedule { get; set; }
    public EventContact Contact { get; set; }
    public EventRecordDTO(
      string name,
      int typeId,
      EventRecordScheduleDTO schedule,
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
      var contract = new Contract<EventRecordDTO>()
        .IsNotNullOrEmpty(Name, "Name", "Preenchimento Obrigatório")
        .IsGreaterOrEqualsThan(Name, 3, "Name", "Deve ter pelo menos 3 caracteres")
        .IsNotNull(TypeId, "TypeId", "Preenchimento Obrigatório")
        .IsGreaterThan(TypeId, 0, "TypeId", "Seleção inválida")
        .IsNotNull(Schedule.PlaceId, "Schedule.placeId", "Seleção Obrigatório")
        .IsGreaterThan(Schedule.PlaceId, 0, "Schedule.placeId", "Seleção inválida")
        .IsNotNull(Schedule.StartAt, "Schedule.startAt", "Preenchimento Obrigatório")
        .IsNotNull(Schedule.Duration, "Schedule.duration", "Preenchimento Obrigatório")
        .IsGreaterThan(Schedule.Duration, 1, "Schedule.duration", "Deve ter pelo menos uma hora de duração")
        .IsNotNullOrEmpty(Contact.Phone, "Contact.phone", "Preenchimento Obrigatório")
        .IsTrue(Contact.Phone.Length == 10 || Contact.Phone.Length == 11, "Contact.phone", "Número inválido")
        .IsNotNullOrEmpty(Contact.Email, "Contact.email", "Preenchimento Obrigatório")
        .IsEmail(Contact.Email, "Contact.email", "Email Inválido");

      AddNotifications(contract);
    }
  }
}
