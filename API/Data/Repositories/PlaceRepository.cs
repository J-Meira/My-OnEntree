namespace API.Data.Repositories
{
  public class PlaceRepository(
    AppDbContext context,
    IMapper mapper
  ) : IPlaceRepository
  {
    private readonly AppDbContext _context = context;
    private readonly IMapper _mapper = mapper;

    public async Task<TaskResult<int>> Create(PlaceRecordDTO dto, string userName)
    {
      if (!dto.IsValid)
      {
        return new TaskResult<int>(dto.Notifications);
      }

      var test = await _context.Places
        .Where(p => p.Document == dto.Document)
        .FirstOrDefaultAsync();

      if (test is not null)
      {
        return new TaskResult<int>(new TaskError("BadRequest", "Já existe um local registrado com esse CNPJ"));
      }

      var record = _mapper.Map<Place>(dto);

      var city = await _context.Cities.FindAsync(dto.Location.CityId);
      if (city is null)
      {
        return new TaskResult<int>(new TaskError($"Location.cityId", "Seleção Inválida"));
      }
      record.Location.City = city;

      var placeType = await _context.PlaceTypes.FindAsync(dto.TypeId);
      if (placeType is null)
      {
        return new TaskResult<int>(new TaskError($"TypeId", "Seleção Inválida"));
      }
      record.Type = placeType;

      record.CreatedBy = userName;
      record.UpdatedBy = userName;

      _context.Places.Add(record);

      var result = await _context.SaveChangesAsync() > 0;

      return
        result ? new TaskResult<int>(record.Id) :
        new TaskResult<int>(new TaskError("BadRequest"));
    }

    public async Task<GetAllDTO<PlaceDTO>> GetAll(GetAllParams getAllParams)
    {
      var query = _context.Places
        .Filter(getAllParams)
        .ProjectTo<PlaceDTO>(_mapper.ConfigurationProvider)
        .AsQueryable();

      PlaceDTO? record = null;
      if (getAllParams.Id is not null)
      {
        record = await GetById(getAllParams.Id ?? 0);
      }

      return await GetAllDTO<PlaceDTO>
        .ToPageList(query, getAllParams, record);
    }

    public async Task<PlaceDTO?> GetById(int id)
    {
      return await _context.Places
        .Where(x => x.Id == id)
        .ProjectTo<PlaceDTO>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();
    }

    public async Task<TaskResult<int>> UpdateById(PlaceRecordDTO dto, int id, string userName)
    {
      var record = await _context.Places
        .Include(x => x.Location)
        .Include(x => x.Contact)
        .Where(p => p.Id == id)
        .FirstOrDefaultAsync();

      if (record is null)
      {
        return new TaskResult<int>(false);
      }

      if (!dto.IsValid)
      {
        return new TaskResult<int>(dto.Notifications);
      }

      if (dto.Document != record.Document)
      {
        var test = await _context.Places
        .Where(p => p.Document == dto.Document)
        .FirstOrDefaultAsync();

        if (test is not null)
        {
          return new TaskResult<int>(new TaskError("BadRequest", "Já existe um local registrado com esse CNPJ"));
        }
      }

      var city = await _context.Cities.FindAsync(dto.Location.CityId);
      if (city is null)
      {
        return new TaskResult<int>(new TaskError($"Location.cityId", "Seleção Inválida"));
      }
      record.Location.City = city;

      var placeType = await _context.PlaceTypes.FindAsync(dto.TypeId);
      if (placeType is null)
      {
        return new TaskResult<int>(new TaskError($"TypeId", "Seleção Inválida"));
      }
      record.Type = placeType;

      record.Update(dto, userName);

      var result = await _context.SaveChangesAsync() > 0;

      return
        result ? new TaskResult<int>(id) :
        new TaskResult<int>(new TaskError("BadRequest"));
    }

    public async Task<TaskResult<int>> DeleteById(int id)
    {
      var record = await _context.Places
        .Include(x => x.Location)
        .Include(x => x.Contact)
        .Where(p => p.Id == id)
        .FirstOrDefaultAsync();

      if (record is null)
      {
        return new TaskResult<int>(false);
      }

      _context.Places.Remove(record);

      var result = await _context.SaveChangesAsync() > 0;

      return
        result ? new TaskResult<int>(id) :
        new TaskResult<int>(new TaskError("BadRequest"));
    }
  }
}
