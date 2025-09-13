namespace RealEstate.Api.Domain;

public class Owner
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string WhatsApp { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string ProfileImage { get; set; } = string.Empty;
    public bool IsAgent { get; set; } = false;
    public bool IsVerified { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
