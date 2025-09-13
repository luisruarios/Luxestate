using Microsoft.Extensions.Options;
using MongoDB.Driver;
using RealEstate.Api.Domain;

namespace RealEstate.Api.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> _collection;

    public PropertyRepository(IOptions<MongoSettings> options)
    {
        var settings = options.Value;
        var client = new MongoClient(settings.ConnectionString);
        var database = client.GetDatabase(settings.DatabaseName);
        _collection = database.GetCollection<Property>(settings.CollectionName);
    }

    public async Task<IEnumerable<Property>> GetAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice)
    {
        var filterBuilder = Builders<Property>.Filter;
        var filters = new List<FilterDefinition<Property>>();

        if (!string.IsNullOrWhiteSpace(name))
            filters.Add(filterBuilder.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(name, "i")));

        if (!string.IsNullOrWhiteSpace(address))
            filters.Add(filterBuilder.Regex(p => p.AddressProperty, new MongoDB.Bson.BsonRegularExpression(address, "i")));

        if (minPrice.HasValue)
            filters.Add(filterBuilder.Gte(p => p.PriceProperty, minPrice.Value));

        if (maxPrice.HasValue)
            filters.Add(filterBuilder.Lte(p => p.PriceProperty, maxPrice.Value));

        var filter = filters.Count > 0 ? filterBuilder.And(filters) : FilterDefinition<Property>.Empty;

        var sort = Builders<Property>.Sort.Descending(p => p.PriceProperty);

        var results = await _collection.Find(filter).Sort(sort).ToListAsync();
        return results;
    }

    public async Task<Property?> GetByIdAsync(string id)
    {
        return await _collection.Find(p => p.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Property> CreateAsync(Property property)
    {
        // simple Id
        property.Id = Guid.NewGuid().ToString("N");
        await _collection.InsertOneAsync(property);
        return property;
    }

    public async Task DeleteAllAsync()
    {
        await _collection.DeleteManyAsync(FilterDefinition<Property>.Empty);
    }
}
