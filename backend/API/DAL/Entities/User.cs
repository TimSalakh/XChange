using Microsoft.AspNetCore.Identity;

namespace API.DAL.Entites;

public class User : IdentityUser<Guid>
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public int Age { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? Bio { get; set; }
    public DateTime CreationDate { get; set; }
    public ICollection<Letter>? Sent { get; set; }
    public ICollection<Letter>? Received { get; set; }
}

