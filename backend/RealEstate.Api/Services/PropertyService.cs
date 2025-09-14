using RealEstate.Api.Domain;
using RealEstate.Api.DTOs;
using RealEstate.Api.Repositories;

namespace RealEstate.Api.Services;

public class PropertyService : IPropertyService
{
    private readonly IPropertyRepository _repo;
    private readonly ILogger<PropertyService> _logger;

    public PropertyService(IPropertyRepository repo, ILogger<PropertyService> logger)
    {
        _repo = repo ?? throw new ArgumentNullException(nameof(repo));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<IEnumerable<PropertyDto>> GetAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice)
    {
        try
        {
            _logger.LogInformation("Fetching properties with filters: name={Name}, address={Address}, minPrice={MinPrice}, maxPrice={MaxPrice}", 
                name, address, minPrice, maxPrice);
                
            var entities = await _repo.GetAsync(name, address, minPrice, maxPrice);
            var result = entities.Select(MapToDto).ToList();
            
            _logger.LogInformation("Successfully fetched {Count} properties", result.Count);
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while fetching properties");
            throw;
        }
    }

    public async Task<PropertyDto?> GetByIdAsync(string id)
    {
        try
        {
            if (string.IsNullOrEmpty(id))
            {
                _logger.LogWarning("GetByIdAsync called with null or empty id");
                return null;
            }

            _logger.LogInformation("Fetching property with id: {PropertyId}", id);
            
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null)
            {
                _logger.LogWarning("Property with id {PropertyId} not found", id);
                return null;
            }

            var result = MapToDto(entity);
            _logger.LogInformation("Successfully fetched property: {PropertyName}", result.Name);
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while fetching property with id: {PropertyId}", id);
            throw;
        }
    }

    public async Task<PropertyDto> CreateAsync(CreatePropertyDto dto)
    {
        try
        {
            ArgumentNullException.ThrowIfNull(dto);
            
            _logger.LogInformation("Creating new property: {PropertyName}", dto.Name);

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
                Amenities = dto.Amenities ?? new List<string>(),
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
            var result = MapToDto(created);
            
            _logger.LogInformation("Successfully created property with id: {PropertyId}", result.Id);
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while creating property: {PropertyName}", dto?.Name);
            throw;
        }
    }

    private static PropertyDto MapToDto(Property p)
    {
        return new PropertyDto
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
            Amenities = p.Amenities ?? new List<string>(),
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
}
