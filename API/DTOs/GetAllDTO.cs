namespace API.DTOs
{
  public class GetAllDTO<T>
  {
    public int TotalOfRecords { get; set; }
    public List<T> Records { get; set; }

    public GetAllDTO(List<T> records)
    {
      Records = records;
      TotalOfRecords = records.Count;
    }
    public GetAllDTO(List<T> records, int total)
    {
      Records = records;
      TotalOfRecords = total;
    }

    public static async Task<GetAllDTO<T>> ToPageList(
      IQueryable<T> query,
      GetAllParams getAllParams,
      T? record
    )
    {
      var limit = getAllParams.Limit;
      var count = await query.CountAsync();
      if (record is not null) limit--;
      var items = await query
        .Skip((getAllParams.Page - 1) * limit)
        .Take(limit)
        .ToListAsync();
      if (record is not null)
      {
        count++;
        items.Insert(0, record);
      }
      return new GetAllDTO<T>(items, count);
    }
  }
}
