namespace API.Data.Repositories
{
  public class GenericRepository(AppDbContext context, IMapper mapper) : IGenericRepository
  {
    private readonly AppDbContext _context = context;
    private readonly IMapper _mapper = mapper;

    public async Task<GetAllDTO<EventType>> GetAllEventTypes()
    {
      var list = await _context.EventTypes.ToListAsync();

      return new GetAllDTO<EventType>(list);
    }

    public async Task<GetAllDTO<PlaceType>> GetAllPlaceTypes()
    {
      var list = await _context.PlaceTypes.ToListAsync();

      return new GetAllDTO<PlaceType>(list);
    }

    public async Task<GetAllDTO<State>> GetAllStates()
    {
      var list = await _context.States
        .ToListAsync();

      return new GetAllDTO<State>(list);
    }

    public async Task<GetAllDTO<CityDTO>> SearchCities(GetAllParams getAllParams)
    {
      var query = _context.Cities
        .Filter(getAllParams)
        .ProjectTo<CityDTO>(_mapper.ConfigurationProvider)
        .AsQueryable();

      CityDTO? record = null;

      if (getAllParams.Id is not null)
      {
        record = await _context.Cities
        .ProjectTo<CityDTO>(_mapper.ConfigurationProvider)
        .Where(x => x.Id == getAllParams.Id)
        .FirstOrDefaultAsync();
      }

      return await GetAllDTO<CityDTO>
        .ToPageList(query, getAllParams, record);
    }
  }
}
