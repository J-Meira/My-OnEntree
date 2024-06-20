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
        "place" => query.OrderBy(p => p.Schedule.Place.Name),
        "-place" => query.OrderByDescending(p => p.Schedule.Place.Name),
        "startAt" => query.OrderBy(p => p.Schedule.StartAt),
        "-startAt" => query.OrderByDescending(p => p.Schedule.StartAt),
        "createdAt" => query.OrderBy(p => p.CreatedAt),
        "-createdAt" => query.OrderByDescending(p => p.CreatedAt),
        "updatedAt" => query.OrderBy(p => p.UpdatedAt),
        "-updatedAt" => query.OrderByDescending(p => p.UpdatedAt),
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
