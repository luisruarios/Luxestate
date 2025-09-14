using Microsoft.Extensions.Options;
using MongoDB.Driver;
using RealEstate.Api.Domain;

namespace RealEstate.Api.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> _collection;
    private readonly ILogger<PropertyRepository> _logger;

    public PropertyRepository(IOptions<MongoSettings> options, ILogger<PropertyRepository> logger)
    {
        var settings = options.Value ?? throw new ArgumentNullException(nameof(options));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        try
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _collection = database.GetCollection<Property>(settings.CollectionName);
            
            _logger.LogInformation("Connected to MongoDB database: {DatabaseName}, collection: {CollectionName}", 
                settings.DatabaseName, settings.CollectionName);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to connect to MongoDB");
            throw;
        }
    }

    public async Task<IEnumerable<Property>> GetAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice)
    {
        try
        {
            var filterBuilder = Builders<Property>.Filter;
            var filters = new List<FilterDefinition<Property>>();

            // Add availability filter by default
            filters.Add(filterBuilder.Eq(p => p.IsAvailable, true));

            if (!string.IsNullOrWhiteSpace(name))
            {
                filters.Add(filterBuilder.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(name, "i")));
            }

            if (!string.IsNullOrWhiteSpace(address))
            {
                filters.Add(filterBuilder.Regex(p => p.AddressProperty, new MongoDB.Bson.BsonRegularExpression(address, "i")));
            }

            if (minPrice.HasValue)
            {
                var priceFilter = filterBuilder.Or(
                    filterBuilder.Gte(p => p.PriceProperty, minPrice.Value),
                    filterBuilder.Gte(p => p.RentProperty, minPrice.Value)
                );
                filters.Add(priceFilter);
            }

            if (maxPrice.HasValue)
            {
                var priceFilter = filterBuilder.Or(
                    filterBuilder.And(
                        filterBuilder.Ne(p => p.PriceProperty, null),
                        filterBuilder.Lte(p => p.PriceProperty, maxPrice.Value)
                    ),
                    filterBuilder.And(
                        filterBuilder.Ne(p => p.RentProperty, null),
                        filterBuilder.Lte(p => p.RentProperty, maxPrice.Value)
                    )
                );
                filters.Add(priceFilter);
            }

            var filter = filterBuilder.And(filters);

            // Sort by created date (newest first) for better UX
            var sort = Builders<Property>.Sort.Descending(p => p.CreatedAt);

            // Add projection to exclude sensitive data if needed
            var options = new FindOptions<Property>
            {
                Sort = sort,
                // Limit results for performance
                Limit = 100
            };

            var results = await _collection.Find(filter, options).ToListAsync();
            
            _logger.LogInformation("Retrieved {Count} properties with filters applied", results.Count);
            return results;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while fetching properties");
            throw;
        }
    }

    public async Task<Property?> GetByIdAsync(string id)
    {
        try
        {
            if (string.IsNullOrEmpty(id))
            {
                _logger.LogWarning("GetByIdAsync called with null or empty id");
                return null;
            }

            var result = await _collection.Find(p => p.Id == id).FirstOrDefaultAsync();
            
            if (result == null)
            {
                _logger.LogWarning("Property with id {PropertyId} not found", id);
            }

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while fetching property by id: {PropertyId}", id);
            throw;
        }
    }

    public async Task<Property> CreateAsync(Property property)
    {
        try
        {
            ArgumentNullException.ThrowIfNull(property);

            // Generate unique ID
            property.Id = Guid.NewGuid().ToString("N");
            property.CreatedAt = DateTime.UtcNow;
            property.UpdatedAt = DateTime.UtcNow;

            await _collection.InsertOneAsync(property);
            
            _logger.LogInformation("Successfully created property with id: {PropertyId}", property.Id);
            return property;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while creating property");
            throw;
        }
    }

    public async Task DeleteAllAsync()
    {
        try
        {
            var result = await _collection.DeleteManyAsync(FilterDefinition<Property>.Empty);
            _logger.LogInformation("Deleted {Count} properties", result.DeletedCount);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while deleting all properties");
            throw;
        }
    }
}
