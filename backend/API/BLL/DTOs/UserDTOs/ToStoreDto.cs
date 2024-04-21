namespace API.BLL.DTOs.UserDTOs;

public class ToStoreDto
{
    public string Token { get; set; } = null!;
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
}
