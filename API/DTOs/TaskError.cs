namespace API.DTOs
{
  public class TaskError
  {
    public string Key { get; set; }
    public string Message { get; set; }
    public TaskError(string key, string message)
    {
      Key = key;
      Message = message;
    }
    public TaskError(string key)
    {
      Key = key;
      Message = "Erro interno no servidor, Por Favor Tente novamente mais tarde";
    }
  }
}
