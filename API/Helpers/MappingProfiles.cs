namespace API.Helpers
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<City, CityDTO>()
        .ForMember(destination => destination.Id, options =>
          options.MapFrom(source => source.Id))
        .ForMember(destination => destination.Name, options =>
          options.MapFrom(source => $"{source.Name} - {source.State.Abbreviation}"))
        .ForMember(destination => destination.StateId, options =>
          options.MapFrom(source => source.State.Id));
      CreateMap<CityDTO, City>();
      CreateMap<User, UserDTO>();
      CreateMap<PlaceRecordDTO, Place>();
      CreateMap<PlaceRecordLocationDTO, PlaceLocation>();
      CreateMap<Place, PlaceDTO>();
      CreateMap<PlaceLocation, PlaceLocationDTO>()
        .IncludeMembers(x => x.City);
      CreateMap<City, PlaceLocationDTO>();
      CreateMap<EventRecordDTO, Event>();
      CreateMap<EventRecordScheduleDTO, EventSchedule>();
      CreateMap<Event, EventDTO>();
      CreateMap<EventSchedule, EventScheduleDTO>()
        .IncludeMembers(x => x.Place);
      CreateMap<Place, EventScheduleDTO>();
    }
  }
}
