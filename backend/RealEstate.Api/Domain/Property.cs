namespace RealEstate.Api.Domain;

public class Property
{
    public string Id { get; set; } = string.Empty;
    public string IdOwner { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string AddressProperty { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    // Pricing
    public decimal? PriceProperty { get; set; } // Purchase price (nullable if rent-only)
    public decimal? RentProperty { get; set; } // Monthly rent (nullable if sale-only)

    // Property Details
    public int Bedrooms { get; set; }
    public int Bathrooms { get; set; }
    public int Area { get; set; } // Square meters
    public string PropertyType { get; set; } = string.Empty; // Apartment, House, Studio, etc.

    // Images (3-10 images)
    public List<string> Images { get; set; } = new();

    // Amenities (for icon mapping)
    public List<string> Amenities { get; set; } = new();

    // Owner Contact Information (embedded for quick access)
    public string OwnerName { get; set; } = string.Empty;
    public string OwnerEmail { get; set; } = string.Empty;
    public string OwnerPhone { get; set; } = string.Empty;
    public string OwnerWhatsApp { get; set; } = string.Empty;
    public string OwnerCompany { get; set; } = string.Empty;
    public string OwnerProfileImage { get; set; } = string.Empty;
    public bool IsOwnerAgent { get; set; } = false;
    public bool IsOwnerVerified { get; set; } = true;

    // Additional features
    public int YearBuilt { get; set; }
    public bool IsAvailable { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Legacy field for backward compatibility
    [Obsolete("Use Images property instead")]
    public string Image { get; set; } = string.Empty;
}
