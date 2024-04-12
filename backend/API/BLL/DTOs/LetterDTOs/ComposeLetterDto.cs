using System.ComponentModel.DataAnnotations;

namespace API.BLL.DTOs.LetterDTOs;

public class ComposeLetterDto
{
    [Required]
    public Guid SenderId { get; set; }

    [Required]
    [EmailAddress]
    public string ReceiverEmail { get; set; } = null!;

    [Required]
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Subject max legth is 50 characters.")]
    public string Subject { get; set; } = null!;

    [Required]
    [StringLength(1000, MinimumLength = 1, ErrorMessage = "Letter's body length must be in range [1, 1000].")]
    public string Body { get; set; } = null!;
}
