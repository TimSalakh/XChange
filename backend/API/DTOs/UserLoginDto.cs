using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UserLoginDto
{
    [Required(ErrorMessage = "Email is required.")]
    [MinLength(10)]
    [MaxLength(40)]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Password is required.")]
    [MinLength(12)]
    [MaxLength(60)]
    public string Password { get; set; } = null!;
}