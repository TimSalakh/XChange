namespace API.BLL.DTOs.LetterDTOs;

public class DisplayLetterDto
{
    public Guid Id { get; set; }
    public string Sender { get; set; }
    public string Receiver { get; set; }
    public string Date { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
}
