namespace RealEstate.Api.DTOs;

public class PropertyDto
{
    public string Id { get; set; } = string.Empty;
    public string IdOwner { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string AddressProperty { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    // Pricing
    public decimal? PriceProperty { get; set; }
    public decimal? RentProperty { get; set; }

    // Property Details
    public int Bedrooms { get; set; }
    public int Bathrooms { get; set; }
    public int Area { get; set; }
    public string PropertyType { get; set; } = string.Empty;

    // Images and Amenities
    public List<string> Images { get; set; } = new();
    public List<string> Amenities { get; set; } = new();

    // Owner Contact Information
    public OwnerContactDto Owner { get; set; } = new();

    // Additional Info
    public int YearBuilt { get; set; }
    public bool IsAvailable { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Legacy field for backward compatibility
    public string Image { get; set; } = string.Empty;
}

public class OwnerContactDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string WhatsApp { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string ProfileImage { get; set; } = string.Empty;
    public bool IsAgent { get; set; } = false;
    public bool IsVerified { get; set; } = true;
}

public class CreatePropertyDto
{
    public string IdOwner { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string AddressProperty { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    // Pricing (at least one required)
    public decimal? PriceProperty { get; set; }
    public decimal? RentProperty { get; set; }

    // Property Details
    public int Bedrooms { get; set; }
    public int Bathrooms { get; set; }
    public int Area { get; set; }
    public string PropertyType { get; set; } = string.Empty;

    // Images and Amenities
    public List<string> Images { get; set; } = new();
    public List<string> Amenities { get; set; } = new();

    // Owner Contact Information
    public string OwnerName { get; set; } = string.Empty;
    public string OwnerEmail { get; set; } = string.Empty;
    public string OwnerPhone { get; set; } = string.Empty;
    public string OwnerWhatsApp { get; set; } = string.Empty;
    public string OwnerCompany { get; set; } = string.Empty;
    public string OwnerProfileImage { get; set; } = string.Empty;
    public bool IsOwnerAgent { get; set; } = false;
    public bool IsOwnerVerified { get; set; } = true;

    // Additional Info
    public int YearBuilt { get; set; }
    public bool IsAvailable { get; set; } = true;

    // Legacy field for backward compatibility
    public string Image { get; set; } = string.Empty;
}
