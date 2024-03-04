using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Models;

[Keyless]
public class AccountsBans
{
    [Required]
    [ForeignKey("Accounts")]
    public string? AccountEmail { get; set; } = null!;

    [Required]
    [ForeignKey("BanLists")]
    public int? BanId { get; set; } = null!;
}
