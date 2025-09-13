using RealEstate.Api.Domain;

namespace RealEstate.Api.Repositories;

public interface IPropertyRepository
{
    Task<IEnumerable<Property>> GetAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice);
    Task<Property?> GetByIdAsync(string id);
    Task<Property> CreateAsync(Property property);
    Task DeleteAllAsync();
}
