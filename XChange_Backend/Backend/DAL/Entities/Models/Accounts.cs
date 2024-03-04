using System.ComponentModel.DataAnnotations;

namespace DAL.Entities.Models;

public class Accounts
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [StringLength(50)]
    public string? FullName { get; set; } = null;

    [Required]
    public int? Age { get; set; } = null;

    [Required]
    public DateTime? CreationDate { get; set; } = null!;

    [Required]
    [StringLength(30)]
    public string? Email { get; set; } = null;

    [Required]
    public string? Paswword { get; set; } = null;

    [Required]
    public string? Image { get; set; } = null;
}
