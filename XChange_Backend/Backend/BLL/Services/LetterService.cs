using DAL.Entities.Models;
using DAL.Repositories.Implementations;
using TestConsole.Repositories;

namespace BLL.Services;

internal class LetterService
{
    private LettersRepositories _letterRepo = new(new DAL.Entities.Contexts.XChangeDbContext());
    private RecipientsRepository _recipientsRepo = new(new DAL.Entities.Contexts.XChangeDbContext());
    private AccountsRepository _accountsRepo = new(new DAL.Entities.Contexts.XChangeDbContext());
    private AccountsBansRepository _accountsBansRepo = new(new DAL.Entities.Contexts.XChangeDbContext());
    private BansRepository _banRepository = new(new DAL.Entities.Contexts.XChangeDbContext());
    private AttachmentsRepository _attachmentsRepo = new(new DAL.Entities.Contexts.XChangeDbContext());

    //public LetterService(LettersRepositories lettersRepo, 
    //    RecipientsRepository recipientsRepo,
    //    AccountsRepository accountsRepo,
    //    AccountsBansRepository accountsBansRepo,
    //    BansRepository banRepo,
    //    AttachmentsRepository attachementsRepo)
    //{
    //    _letterRepo = lettersRepo;
    //    _recipientsRepo = recipientsRepo;
    //    _accountsRepo = accountsRepo;
    //    _accountsBansRepo = accountsBansRepo;
    //    _banRepository = banRepo;
    //    _attachmentsRepo = attachementsRepo;
    //}

    public async Task<IEnumerable<Letters>?> GetAllReceivedLettersAsync(string accountEmail)
    {
        var letters = await _letterRepo.GetAllAsync();
        var recipients = await _recipientsRepo.GetAllAsync();
        var accounts = await _accountsRepo.GetAllAsync();
        var accountsBans = await _accountsBansRepo.GetAllAsync();
        var bans = await _banRepository.GetAllAsync();

        return from l in letters
               join r in recipients on l.Id equals r.LetterId
               join a in accounts on r.AccountEmail equals accountEmail
               join ab in accountsBans on r.AccountEmail equals ab.AccountEmail
               join b in bans on ab.BanId equals b.Id
               where l.IsDeleteBySender is false && !b.BannedEmail.Equals(l.SenderEmail)
               select l;
    }

    public async Task<IEnumerable<Letters>?> GetAllSentLettersAsync(string accountEmail)
    {
        var letters = await _letterRepo.GetAllAsync();
        var recipients = await _recipientsRepo.GetAllAsync();
        var accounts = await _accountsRepo.GetAllAsync();

        return from l in letters
               where l.SenderEmail == accountEmail && l.IsDeleteBySender is false
               select l;
    }

    public async Task<IEnumerable<Attachments>> GetLettersAttachementsAsync(Guid lettersId)
    {
        var attachements = await _attachmentsRepo.GetAllAsync();

        return from a in attachements
               where a.Letter == lettersId
               select a;
    }
}
