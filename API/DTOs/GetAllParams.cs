namespace API.DTOs
{
  public class GetAllParams
  {
    private const int MaxLimit = 50;
    private int _limit = 10;
    public int Limit
    {
      get => _limit;
      set => _limit = value > MaxLimit ? MaxLimit : value;
    }
    public int Page { get; set; } = 1;
    public string? SearchTerm { get; set; }
    public string? OrderBy { get; set; }
    public int? Id { get; set; }
  }
}
