using System.ComponentModel.DataAnnotations;

namespace API.BLL.DTOs.LetterDTOs;

public class ComposeLetterDto
{
    [Required]
    public Guid Sender { get; set; }

    [Required]
    public Guid Receiver { get; set; }

    [Required]
    [StringLength(50, ErrorMessage = "Subject max legth is 50.")]
    public string Subject { get; set; } = null!;

    [Required]
    [StringLength(1000, MinimumLength = 1, ErrorMessage = "Letter's body length must be in range [1, 1000].")]
    public string Body { get; set; } = null!;
}
