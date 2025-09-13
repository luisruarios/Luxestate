using RealEstate.Api.DTOs;

namespace RealEstate.Api.Services;

public interface IPropertyService
{
    Task<IEnumerable<PropertyDto>> GetAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice);
    Task<PropertyDto?> GetByIdAsync(string id);
    Task<PropertyDto> CreateAsync(CreatePropertyDto dto);
}
