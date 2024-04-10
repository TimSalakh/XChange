namespace API.BLL.Services.Interfaces;

public interface ITokenService
{
    public string CreateToken(params string[] claims);
}
