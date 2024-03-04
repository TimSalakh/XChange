namespace DAL.Repositories.Abstractions;

public interface IBaseRepository<TEntity> where TEntity : class
{
    Task<IEnumerable<TEntity>?> GetAllAsync();
    Task<TEntity?> GetByIdAsync<T>(T id);
    Task AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteByIdAsync(int id);
}
