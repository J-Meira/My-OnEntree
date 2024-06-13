namespace API.Data
{
  public class DbInitializer
  {
    public static async Task InitDb(WebApplication app)
    {
      var s3URL = app.Configuration.GetSection("S3URL").Value;

      using var scope = app.Services.CreateScope();
      using var httpClient = new HttpClient();
      using var context = scope.ServiceProvider.GetService<AppDbContext>();
      using var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

      if (context == null || userManager == null || httpClient == null)
      {
        Console.WriteLine("---------------context and userManager are null---------------");
        return;
      }

      await context.Database.MigrateAsync();

      var jsonOptions = new JsonSerializerOptions()
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      };

      if (!context.States.Any())
      {
        var states = await httpClient.GetFromJsonAsync<List<State>>(s3URL + "states.json");
        var cities = await httpClient.GetFromJsonAsync<List<CityDTO>>(s3URL + "cities.json");

        if (states != null && cities != null)
        {
          foreach (var state in states)
          {
            context.States.Add(state);
            var stateCities = cities.Where(x => x.StateId == state.Id).ToList();
            foreach (var cityJson in stateCities)
            {
              var city = new City
              {
                Id = cityJson.Id,
                Name = cityJson.Name,
                State = state
              };
              context.Cities.Add(city);
            }
          }
        }
      }

      if (!context.PlaceTypes.Any())
      {
        var placeTypes = new List<PlaceType>{
          new() { Label="Cinema"},
          new() { Label="Clube"},
          new() { Label="Estádio"},
          new() { Label="Teatro"},
        };
        context.PlaceTypes.AddRange(placeTypes);
      }

      if (!context.EventTypes.Any())
      {
        var eventTypes = new List<EventType>{
          new() { Label="Apresentação"},
          new() { Label="Filme"},
          new() { Label="Futebol"},
          new() { Label="Show"},
          new() { Label="Vôlei"},
        };
        context.EventTypes.AddRange(eventTypes);
      }

      await context.SaveChangesAsync();

      if (!userManager.Users.Any())
      {
        var master = new User
        {
          Name = "My OnEntrée",
          UserName = "MyOnEntree",
          Email = "dev@jm.app.br"
        };
        await userManager.CreateAsync(master, "Pa$$w0rd");
        await userManager.AddToRolesAsync(master, new[] { "Admin" });
      }
    }
  }
}
