using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Models;

[Keyless]
public class Recipients
{
    [Required]
    [ForeignKey("Accounts")]
    public string? AccountEmail { get; set; } = null!;

    [Required]
    [ForeignKey("Letters")]
    public Guid? LetterId { get; set; } = null!;
}
