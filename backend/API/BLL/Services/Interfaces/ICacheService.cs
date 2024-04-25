namespace API.BLL.Services.Interfaces;

public interface ICacheService
{
    public void Set(object key, object value);
    public object? Get(object key);
    public void Update(object key, object value);
    public void Remove(object key);
}
