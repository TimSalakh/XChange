using System.ComponentModel.DataAnnotations;

namespace DAL.Entities.Models;

public class Bans
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(30)]
    public string? BannedEmail { get; set; } = null!;
}
