namespace API.Entities
{
  [Table("PlaceTypes")]
  public class PlaceType
  {
    public int Id { get; set; }
    public string Label { get; set; } = "";
  }
}
