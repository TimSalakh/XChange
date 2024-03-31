using System.ComponentModel.DataAnnotations;

namespace BLL.DTOs;

public class UserRegisterDto
{
    [Required(ErrorMessage = "Name is required.")]
    [MinLength(3)]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Surname is required.")]
    [MinLength(3)]
    [MaxLength(50)]
    public string Surname { get; set; } = null!;

    [Required(ErrorMessage = "Age is required.")]
    [Range(18, 125, ErrorMessage = "Invalid age. Must be in range [18, 125].")]
    public int Age { get; set; }

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
