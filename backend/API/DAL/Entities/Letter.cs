namespace API.DAL.Entites;

public class Letter
{
    public Guid Id { get; set; }
    public Guid? SenderId { get; set; }
    public User? Sender { get; set; }
    public Guid? ReceiverId { get; set; }
    public User? Receiver { get; set; }
    public DateTime Date { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
}
