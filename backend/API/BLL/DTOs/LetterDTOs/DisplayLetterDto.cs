namespace API.BLL.DTOs.LetterDTOs;

public class DisplayLetterDto
{
    public Guid Id { get; set; }
    public Guid SenderId { get; set; }
    public string Sender { get; set; }
    public Guid ReceiverId { get; set; }
    public string Receiver { get; set; }
    public bool IsRead { get; set; }
    public string Date { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
}
