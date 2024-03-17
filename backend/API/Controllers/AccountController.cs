using DAL.Entities.Contexts;
using DAL.Entities.Models;
using DAL.Repositories.Implementations;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("account/[controller]")]
public class AccountController : Controller
{
    private readonly BaseRepository<Account> _accountRepository;

    public AccountController(BaseRepository<Account> accountRepository)
    {
        _accountRepository = accountRepository;
    }

    public async Task<IActionResult> Get()
    {
        return View();
    }
}
