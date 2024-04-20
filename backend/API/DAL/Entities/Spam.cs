using API.DAL.Entites;

namespace API.DAL.Entities;

public class Spam
{
    public Guid Id { get; set; }
    public Guid ReceiverId { get; set; }
    public User? Receiver { get; set; }
    public Guid SenderId { get; set; }
    public User? Sender { get; set; }
}
