using DAL.Entities.Models;
using DAL.Entities.Contexts;
using DAL.Repositories.Abstractions;

namespace DAL.Repositories.Implementations;

public class AttachmentsRepository : BaseRepository<Attachments>
{
    public AttachmentsRepository(XChangeDbContext context) : base(context) { }
}
