namespace BLL.DTOs.UserDTOs;

public class DisplayUserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Surname { get; set; } = null!;
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? Bio { get; set; }
}
