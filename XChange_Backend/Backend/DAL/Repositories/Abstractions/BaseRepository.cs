using Microsoft.EntityFrameworkCore;
using DAL.Entities.Contexts;

namespace DAL.Repositories.Abstractions;

public class BaseRepository<TEntity> where TEntity : class
{
    protected readonly XChangeDbContext _context;

    public BaseRepository(XChangeDbContext context) =>
        _context = context;

    public async Task AddAsync(TEntity entity)
    {
        await _context.Set<TEntity>().AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public virtual async Task DeleteAsync(int id)
    {
        var entity = await _context.Set<TEntity>().FindAsync(id);
        if (entity == null) return;
        _context.Set<TEntity>().Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync() =>
        await _context.Set<TEntity>().ToListAsync();

    public virtual async Task<TEntity?> GetByIdAsync<T>(T id) =>
        await _context.Set<TEntity>().FindAsync(id);

    public virtual async Task UpdateAsync(TEntity entity)
    {
        _context.Set<TEntity>().Update(entity);
        await _context.SaveChangesAsync();
    }
}
