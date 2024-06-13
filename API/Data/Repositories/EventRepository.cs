
namespace API.Data.Repositories
{
  public class EventRepository(
    AppDbContext context,
    IMapper mapper
  ) : IEventRepository
  {
    private readonly AppDbContext _context = context;
    private readonly IMapper _mapper = mapper;

    public async Task<TaskResult<int>> Create(EventRecordDTO dto, string userName)
    {
      if (!dto.IsValid)
      {
        return new TaskResult<int>(dto.Notifications);
      }

      var record = _mapper.Map<Event>(dto);

      var place = await _context.Places.FindAsync(dto.Schedule.PlaceId);
      if (place is null)
      {
        return new TaskResult<int>(new TaskError($"Schedule.cityId", "Seleção Inválida"));
      }
      record.Schedule.Place = place;
      record.Schedule.EndAt = dto.Schedule.StartAt.AddHours(dto.Schedule.Duration);

      var test = await _context.EventSchedules
        .Where(x =>
          x.Place.Id == dto.Schedule.PlaceId &&
          x.StartAt < record.Schedule.EndAt &&
          x.EndAt > record.Schedule.StartAt
        )
        .ToListAsync();

      if (test.Count != 0)
      {
        return new TaskResult<int>(new TaskError("BadRequest", "Já existe um evento ocorrendo no local neste período"));
      }

      var eventType = await _context.EventTypes.FindAsync(dto.TypeId);
      if (eventType is null)
      {
        return new TaskResult<int>(new TaskError($"TypeId", "Seleção Inválida"));
      }
      record.Type = eventType;

      record.CreatedBy = userName;
      record.UpdatedBy = userName;

      _context.Events.Add(record);

      var result = await _context.SaveChangesAsync() > 0;

      return
        result ? new TaskResult<int>(record.Id) :
        new TaskResult<int>(new TaskError("BadRequest"));
    }

    public async Task<GetAllDTO<EventDTO>> GetAll(GetAllEventsParams getAllParams)
    {
      var query = _context.Events
        .Filter(getAllParams)
        .ProjectTo<EventDTO>(_mapper.ConfigurationProvider)
        .AsQueryable();

      EventDTO? record = null;
      if (getAllParams.Id is not null)
      {
        record = await GetById(getAllParams.Id ?? 0);
      }

      return await GetAllDTO<EventDTO>
        .ToPageList(query, getAllParams, record);
    }

    public async Task<EventDTO?> GetById(int id)
    {
      return await _context.Events
        .Where(x => x.Id == id)
        .ProjectTo<EventDTO>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();
    }

    public async Task<TaskResult<int>> UpdateById(EventRecordDTO dto, int id, string userName)
    {
      var record = await _context.Events
        .Include(x => x.Schedule)
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

      var place = await _context.Places.FindAsync(dto.Schedule.PlaceId);
      if (place is null)
      {
        return new TaskResult<int>(new TaskError($"Schedule.placeId", "Seleção Inválida"));
      }
      record.Schedule.Place = place;

      record.Update(dto, userName);

      var test = await _context.EventSchedules
        .Where(x =>
          x.Id != record.Schedule.Id &&
          x.Place.Id == dto.Schedule.PlaceId &&
          x.StartAt < record.Schedule.EndAt &&
          x.EndAt > record.Schedule.StartAt
        )
        .ToListAsync();

      if (test.Count != 0)
      {
        return new TaskResult<int>(new TaskError("BadRequest", "Já existe um evento ocorrendo no local neste período"));
      }

      var eventType = await _context.EventTypes.FindAsync(dto.TypeId);
      if (eventType is null)
      {
        return new TaskResult<int>(new TaskError($"TypeId", "Seleção Inválida"));
      }
      record.Type = eventType;

      var result = await _context.SaveChangesAsync() > 0;

      return
        result ? new TaskResult<int>(id) :
        new TaskResult<int>(new TaskError("BadRequest"));
    }

    public async Task<TaskResult<int>> DeleteById(int id)
    {
      var record = await _context.Events
        .Include(x => x.Schedule)
        .Include(x => x.Contact)
        .Where(p => p.Id == id)
        .FirstOrDefaultAsync();

      if (record is null)
      {
        return new TaskResult<int>(false);
      }

      _context.Events.Remove(record);

      var result = await _context.SaveChangesAsync() > 0;

      return
        result ? new TaskResult<int>(id) :
        new TaskResult<int>(new TaskError("BadRequest"));
    }
  }
}
