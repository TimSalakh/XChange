using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UserEditDto
{
    [MinLength(3)]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    [MinLength(3)]
    [MaxLength(50)]
    public string Surname { get; set; } = null!;

    [Range(18, 125, ErrorMessage = "Invalid age. Must be in range [18, 125].")]
    public int Age { get; set; }

    [MinLength(2)]
    [MaxLength(100)]
    public string Country { get; set; } = null!;

    [MinLength(2)]
    [MaxLength(100)]
    public string City { get; set; } = null!;

    [MaxLength(150)]
    public string Bio { get; set; } = null!;
}