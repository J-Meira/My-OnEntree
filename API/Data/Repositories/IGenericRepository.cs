namespace API.Data.Repositories
{
  public interface IGenericRepository
  {
    public Task<GetAllDTO<State>> GetAllStates();
    public Task<GetAllDTO<CityDTO>> SearchCities(GetAllParams getAllParams);
    public Task<GetAllDTO<PlaceType>> GetAllPlaceTypes();
    public Task<GetAllDTO<EventType>> GetAllEventTypes();
  }
}
