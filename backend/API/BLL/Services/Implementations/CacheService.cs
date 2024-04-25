using API.BLL.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace API.BLL.Services.Implementations;

public class CacheService : ICacheService
{
    private readonly IMemoryCache _memoryCache;

    public CacheService(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
    }

    public object? Get(object key)
    {
        return _memoryCache.Get(key);
    }

    public void Set(object key, object value)
    {
        _memoryCache.Set(key, value);
    }

    public void Update(object key, object value)
    {
        _memoryCache.Remove(key);
        _memoryCache.Set(key, value);
    }

    public void Remove(object key)
    {
        _memoryCache.Remove(key);
    }
}
