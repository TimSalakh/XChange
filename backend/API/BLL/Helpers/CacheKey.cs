namespace API.BLL.Helpers;

public class CacheKey
{
    public MailServiceOptions Option { get; set; }
    public Guid UserId { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}

public enum MailServiceOptions
{
    Inbox,
    Sent,
    Spam,
    Bin
}
