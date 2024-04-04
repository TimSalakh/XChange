namespace API.BLL.DTOs.UserDTOs;

public class DisplayUserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string FullName { get; set; }
    public int Age { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public string Bio { get; set; }
    public DateTime CreationDate { get; set; }
}
