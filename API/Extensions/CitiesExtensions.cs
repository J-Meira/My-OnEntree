namespace API.Extensions
{
  public static class CitiesExtensions
  {
    public static IQueryable<City> Filter(this IQueryable<City> query, GetAllParams getAllParams)
    {
      query = query.OrderBy(p => p.Name);

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
