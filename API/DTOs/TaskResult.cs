namespace API.DTOs
{
  public class TaskResult<T>
  {
    public bool Succeeded { get; set; }
    public List<TaskError>? Errors { get; set; }
    public T? Value { get; set; }

    public TaskResult(T value)
    {
      Succeeded = true;
      Value = value;
    }
    public TaskResult(bool succeeded)
    {
      Succeeded = succeeded;
    }

    public TaskResult(List<TaskError> errors)
    {
      Succeeded = false;
      Errors = errors;
    }

    public TaskResult(IReadOnlyCollection<Notification> notifications)
    {
      Succeeded = false;
      Errors = new List<TaskError>();
      foreach (var item in notifications)
      {
        Errors.Add(new TaskError(item.Key, item.Message));
      }
    }

    public TaskResult(IEnumerable<IdentityError> errors)
    {
      Succeeded = false;
      Errors = new List<TaskError>();
      foreach (var item in errors)
      {
        switch (item.Code)
        {
          case "DuplicateEmail":
            Errors.Add(new TaskError("Email", "Email registrado para outro usuário"));
            break;
          default:
            Errors.Add(new TaskError(item.Code, item.Description));
            break;
        }
      }
    }

    public TaskResult(TaskError error)
    {
      Succeeded = false;
      Errors = new List<TaskError>() { error };
    }

  }
}
