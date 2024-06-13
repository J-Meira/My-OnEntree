namespace API.Data.Repositories
{
  public interface IEventRepository
  {
    public Task<TaskResult<int>> Create(EventRecordDTO dto, string userName);
    public Task<GetAllDTO<EventDTO>> GetAll(GetAllEventsParams getAllParams);
    public Task<EventDTO?> GetById(int id);
    public Task<TaskResult<int>> UpdateById(EventRecordDTO dto, int id, string userName);
    public Task<TaskResult<int>> DeleteById(int id);

  }
}
