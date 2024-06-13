namespace API.Entities
{
  public class Event : Entity
  {
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public EventType Type { get; set; } = new();
    public EventSchedule Schedule { get; set; } = new();
    public EventContact Contact { get; set; } = new();

    public void Update(EventRecordDTO dto, string updatedBy)
    {
      Name = dto.Name;
      Schedule.StartAt = dto.Schedule.StartAt;
      Schedule.EndAt = dto.Schedule.StartAt.AddHours(dto.Schedule.Duration);
      Contact.Phone = dto.Contact.Phone;
      Contact.Email = dto.Contact.Email;
      UpdatedAt = DateTime.UtcNow;
      UpdatedBy = updatedBy;
    }
  }
}
