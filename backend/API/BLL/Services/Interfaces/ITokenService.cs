namespace API.BLL.Services.Interfaces;

public interface ITokenService
{
    public string GetToken(Guid id, string email);
}
