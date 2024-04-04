using System.ComponentModel.DataAnnotations;

namespace API.BLL.DTOs.UserDTOs;

public class LoginUserDto
{
    [Required(ErrorMessage = "Email is required.")]
    [StringLength(40, MinimumLength = 10, ErrorMessage = "Email field length must be in range [10, 40].")]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Password is required.")]
    [StringLength(60, MinimumLength = 12, ErrorMessage = "Password field length must be in range [12, 60].")]
    public string Password { get; set; } = null!;
}