using System.Security.Cryptography;

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

      var masterName = "My OnEntrée";

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

      if (app.Environment.IsDevelopment())
      {
        if (!context.Places.Any())
        {
          var placesNames = new List<string> { "Morubis ", "Allianz Parque ", "Neo Química Arena ", "Audio Club " };
          var turnstilesNames = new List<string> { "A", "B", "C", "D" };
          var placeAddress = "R. Palestra Itália, 200 - Portão A - Água Branca";

          var places = new List<Place>();
          for (int i = 0; i < 20; i++)
          {
            var iS = i.ToString();
            var number = RandomNumberGenerator.GetInt32(3);
            var quant = RandomNumberGenerator.GetInt32(10);
            var city = await context.Cities.FindAsync(quant * 100 + 1);
            var type = await context.PlaceTypes.FindAsync(number + 1);
            if (city is not null && type is not null)
            {
              var gates = new List<string>();
              for (int j = 0; j <= quant; j++)
              {
                gates.Add((j + 1).ToString());
              }
              var turnstiles = new List<string>();
              for (int j = 0; j <= number; j++)
              {
                turnstiles.Add(turnstilesNames[j]);
              }
              places.Add(
                new Place
                {
                  Name = placesNames[number] + iS,
                  Nickname = placesNames[number] + iS,
                  Type = type,
                  Document = "14150437000116",
                  Location = new PlaceLocation
                  {
                    PostalCode = "89050000",
                    City = city,
                    Address = placeAddress,
                  },
                  Contact = new PlaceContact
                  {
                    Email = placesNames[number] + "jm.app.br",
                    Phone = "47999999999"
                  },
                  Gates = gates,
                  Turnstiles = turnstiles,
                  CreatedBy = masterName,
                  UpdatedBy = masterName
                }
              );
            }
          }
          context.Places.AddRange(places);
        }

        await context.SaveChangesAsync();

        if (!context.Events.Any())
        {
          var eventsNames = new List<string> {
            "Final Copa América ",
            "Semi Final Copa América ",
            "Love on tour - Harry Styles ",
            "The Eras Tour - Taylor Swift "
          };

          var events = new List<Event>();
          for (int i = 0; i < 20; i++)
          {
            var iS = i.ToString();
            var number = RandomNumberGenerator.GetInt32(3);
            var quant = RandomNumberGenerator.GetInt32(10);
            var place = await context.Places.FindAsync(quant + 1);
            var type = await context.EventTypes.FindAsync(number + 1);
            if (place is not null && type is not null)
            {
              var startAt = DateTime.UtcNow.AddDays(i + 5);
              events.Add(
                new Event
                {
                  Name = eventsNames[number] + iS,
                  Type = type,
                  Schedule = new EventSchedule
                  {
                    Place = place,
                    StartAt = startAt,
                    EndAt = startAt.AddHours(number)
                  },
                  Contact = new EventContact
                  {
                    Email = eventsNames[number] + "jm.app.br",
                    Phone = "47999999999"
                  },
                  CreatedBy = masterName,
                  UpdatedBy = masterName
                }
              );
            }
          }
          context.Events.AddRange(events);
        }

        await context.SaveChangesAsync();
      }


      if (!userManager.Users.Any())
      {
        var master = new User
        {
          Name = masterName,
          UserName = "MyOnEntree",
          Email = "dev@jm.app.br"
        };
        await userManager.CreateAsync(master, "Pa$$w0rd");
        await userManager.AddToRolesAsync(master, new[] { "Admin" });
      }
    }
  }
}
