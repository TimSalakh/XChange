using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Models;

public class Attachments
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string? Content { get; set; } = null!;

    [Required]
    [ForeignKey("Letters")]
    public Guid? Letter { get; set; } = null!;
}
