namespace API.Extensions
{
  public static class PlaceExtensions
  {
    public static IQueryable<Place> Filter(this IQueryable<Place> query, GetAllParams getAllParams)
    {
      query = getAllParams.OrderBy switch
      {
        "name" => query.OrderBy(p => p.Name),
        "-name" => query.OrderByDescending(p => p.Name),
        "location" => query.OrderBy(p => p.Location.City.Name),
        "-location" => query.OrderByDescending(p => p.Location.City.Name),
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
