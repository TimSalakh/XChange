using System.ComponentModel.DataAnnotations;

namespace API.BLL.DTOs.UserDTOs;

public class EditUserDto
{
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Name field length must be in range [3, 50].")]
    public string Name { get; set; } = null!;

    [StringLength(50, MinimumLength = 3, ErrorMessage = "Surname field length must be in range [3, 50].")]
    public string Surname { get; set; } = null!;

    [Range(18, 125, ErrorMessage = "Age field must be in range [18, 125].")]
    public int Age { get; set; }

    [StringLength(100, MinimumLength = 2, ErrorMessage = "Country field length must be in range [3, 50].")]
    public string Country { get; set; } = null!;

    [StringLength(100, MinimumLength = 2, ErrorMessage = "City field length must be in range [3, 50].")]
    public string City { get; set; } = null!;

    [StringLength(150, ErrorMessage = "Bio field max length is 150.")]
    public string Bio { get; set; } = null!;
}