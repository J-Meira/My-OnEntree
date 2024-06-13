namespace API.Data.Repositories
{
  public interface IPlaceRepository
  {
    public Task<TaskResult<int>> Create(PlaceRecordDTO dto, string userName);
    public Task<GetAllDTO<PlaceDTO>> GetAll(GetAllParams getAllParams);
    public Task<PlaceDTO?> GetById(int id);
    public Task<TaskResult<int>> UpdateById(PlaceRecordDTO dto, int id, string userName);
    public Task<TaskResult<int>> DeleteById(int id);
  }
}
