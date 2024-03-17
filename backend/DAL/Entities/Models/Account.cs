namespace DAL.Entities.Models;

public class Account : BaseEntity
{
    public string FullName { get; set; } = null!;
    public string Sex { get; set; } = null!;
    public int Age { get; set; }
    public DateTime CreationDate { get; set; }
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}
