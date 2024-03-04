using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Models;

public class Letters
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [ForeignKey("Accounts")]
    public string? SenderEmail { get; set; } = null!;

    [Required]
    [StringLength(60)]
    public string? Theme { get; set; } = null!;

    [Required]
    public string? Body { get; set; } = null!;

    [Required]
    public DateTime? CreationDate { get; set; } = null!;

    [Required]
    public bool IsRead { get; set; }

    [Required]
    public bool IsDeleteBySender { get; set; }

    [Required]
    public bool IsDeleteByRecipient { get; set; }
}
