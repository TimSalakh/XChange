using DAL.Entities.Contexts;
using DAL.Entities.Models;
using DAL.Repositories.Abstractions;

namespace DAL.Repositories.Implementations;

public class BansRepository : BaseRepository<Bans>
{
    public BansRepository(XChangeDbContext context) : base(context) { }
}
