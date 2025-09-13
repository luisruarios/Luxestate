using RealEstate.Api.Domain;
using RealEstate.Api.DTOs;
using RealEstate.Api.Repositories;

namespace RealEstate.Api.Services;

public class PropertyService : IPropertyService
{
    private readonly IPropertyRepository _repo;

    public PropertyService(IPropertyRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<PropertyDto>> GetAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice)
    {
        var entities = await _repo.GetAsync(name, address, minPrice, maxPrice);
        return entities.Select(MapToDto);
    }

    public async Task<PropertyDto?> GetByIdAsync(string id)
    {
        var entity = await _repo.GetByIdAsync(id);
        return entity is null ? null : MapToDto(entity);
    }

    public async Task<PropertyDto> CreateAsync(CreatePropertyDto dto)
    {
        var entity = new Property
        {
            IdOwner = dto.IdOwner,
            Name = dto.Name,
            AddressProperty = dto.AddressProperty,
            Description = dto.Description,
            PriceProperty = dto.PriceProperty,
            RentProperty = dto.RentProperty,
            Bedrooms = dto.Bedrooms,
            Bathrooms = dto.Bathrooms,
            Area = dto.Area,
            PropertyType = dto.PropertyType,
            Images = dto.Images?.Any() == true ? dto.Images : new List<string> { dto.Image },
            Amenities = dto.Amenities,
            // Owner contact information
            OwnerName = dto.OwnerName,
            OwnerEmail = dto.OwnerEmail,
            OwnerPhone = dto.OwnerPhone,
            OwnerWhatsApp = dto.OwnerWhatsApp,
            OwnerCompany = dto.OwnerCompany,
            OwnerProfileImage = dto.OwnerProfileImage,
            IsOwnerAgent = dto.IsOwnerAgent,
            IsOwnerVerified = dto.IsOwnerVerified,
            YearBuilt = dto.YearBuilt,
            IsAvailable = dto.IsAvailable,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            // Legacy support
            Image = dto.Images?.FirstOrDefault() ?? dto.Image
        };

        var created = await _repo.CreateAsync(entity);
        return MapToDto(created);
    }

    private static PropertyDto MapToDto(Property p) => new PropertyDto
    {
        Id = p.Id,
        IdOwner = p.IdOwner,
        Name = p.Name,
        AddressProperty = p.AddressProperty,
        Description = p.Description,
        PriceProperty = p.PriceProperty,
        RentProperty = p.RentProperty,
        Bedrooms = p.Bedrooms,
        Bathrooms = p.Bathrooms,
        Area = p.Area,
        PropertyType = p.PropertyType,
        Images = p.Images?.Any() == true ? p.Images : new List<string> { p.Image },
        Amenities = p.Amenities,
        Owner = new OwnerContactDto
        {
            Name = p.OwnerName,
            Email = p.OwnerEmail,
            Phone = p.OwnerPhone,
            WhatsApp = p.OwnerWhatsApp,
            Company = p.OwnerCompany,
            ProfileImage = p.OwnerProfileImage,
            IsAgent = p.IsOwnerAgent,
            IsVerified = p.IsOwnerVerified
        },
        YearBuilt = p.YearBuilt,
        IsAvailable = p.IsAvailable,
        CreatedAt = p.CreatedAt,
        UpdatedAt = p.UpdatedAt,
        // Legacy support
        Image = p.Images?.FirstOrDefault() ?? p.Image
    };
}
