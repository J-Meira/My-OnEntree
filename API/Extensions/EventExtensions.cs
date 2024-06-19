namespace API.Extensions
{
  public static class EventExtensions
  {
    public static IQueryable<Event> Filter(this IQueryable<Event> query, GetAllParams getAllParams)
    {
      query = getAllParams.OrderBy switch
      {
        "name" => query.OrderBy(p => p.Name),
        "-name" => query.OrderByDescending(p => p.Name),
        "type" => query.OrderBy(p => p.Type.Label),
        "-type" => query.OrderByDescending(p => p.Type.Label),
        "schedule" => query.OrderBy(p => p.Schedule.Place.Name),
        "-schedule" => query.OrderByDescending(p => p.Schedule.Place.Name),
        "createdAt" => query.OrderBy(p => p.CreatedAt),
        "-createdAt" => query.OrderByDescending(p => p.CreatedAt),
        "updatedAt" => query.OrderBy(p => p.Schedule.StartAt),
        "-updatedAt" => query.OrderByDescending(p => p.Schedule.StartAt),
        _ => query.OrderBy(p => p.Id)
      };

      if (!string.IsNullOrEmpty(getAllParams.SearchTerm))
      {
        var lCST = getAllParams.SearchTerm.Trim().ToLower();
        query = query
          .Where(x => EF
            .Functions
            .Collate(x.Name, "SQL_Latin1_General_CP1_CI_AI")
            .ToLower()
            .Contains(lCST)
          );
      }

      if (getAllParams.Id is not null)
      {
        query = query.Where(x => x.Id != getAllParams.Id);
      }

      return query;
    }
  }
}
