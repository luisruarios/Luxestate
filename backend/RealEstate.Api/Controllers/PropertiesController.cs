using Microsoft.AspNetCore.Mvc;
using RealEstate.Api.DTOs;
using RealEstate.Api.Services;
using FluentValidation;

namespace RealEstate.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _service;
    private readonly IValidator<CreatePropertyDto> _createValidator;
    private readonly ILogger<PropertiesController> _logger;

    public PropertiesController(
        IPropertyService service, 
        IValidator<CreatePropertyDto> createValidator,
        ILogger<PropertiesController> logger)
    {
        _service = service ?? throw new ArgumentNullException(nameof(service));
        _createValidator = createValidator ?? throw new ArgumentNullException(nameof(createValidator));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    /// <summary>
    /// Get all properties with optional filtering
    /// </summary>
    /// <param name="name">Filter by property name (case-insensitive)</param>
    /// <param name="address">Filter by address (case-insensitive)</param>
    /// <param name="minPrice">Minimum price filter</param>
    /// <param name="maxPrice">Maximum price filter</param>
    /// <returns>List of properties matching the criteria</returns>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<PropertyDto>), 200)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<IEnumerable<PropertyDto>>> Get(
        [FromQuery] string? name, 
        [FromQuery] string? address, 
        [FromQuery] decimal? minPrice, 
        [FromQuery] decimal? maxPrice)
    {
        try
        {
            _logger.LogInformation("Getting properties with filters - name: {Name}, address: {Address}, minPrice: {MinPrice}, maxPrice: {MaxPrice}",
                name, address, minPrice, maxPrice);

            var results = await _service.GetAsync(name, address, minPrice, maxPrice);
            
            _logger.LogInformation("Successfully retrieved {Count} properties", results.Count());
            return Ok(results);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting properties");
            return StatusCode(500, new { message = "An error occurred while fetching properties" });
        }
    }

    /// <summary>
    /// Get a specific property by ID
    /// </summary>
    /// <param name="id">Property ID</param>
    /// <returns>Property details</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PropertyDto), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<PropertyDto>> GetById(string id)
    {
        try
        {
            if (string.IsNullOrEmpty(id))
            {
                _logger.LogWarning("GetById called with null or empty id");
                return BadRequest(new { message = "Property ID is required" });
            }

            _logger.LogInformation("Getting property by id: {PropertyId}", id);

            var item = await _service.GetByIdAsync(id);
            if (item == null)
            {
                _logger.LogWarning("Property with id {PropertyId} not found", id);
                return NotFound(new { message = $"Property with ID {id} not found" });
            }

            _logger.LogInformation("Successfully retrieved property: {PropertyName}", item.Name);
            return Ok(item);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting property by id: {PropertyId}", id);
            return StatusCode(500, new { message = "An error occurred while fetching the property" });
        }
    }

    /// <summary>
    /// Create a new property
    /// </summary>
    /// <param name="dto">Property creation data</param>
    /// <returns>Created property</returns>
    [HttpPost]
    [ProducesResponseType(typeof(PropertyDto), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<PropertyDto>> Create([FromBody] CreatePropertyDto dto)
    {
        try
        {
            if (dto == null)
            {
                _logger.LogWarning("Create called with null dto");
                return BadRequest(new { message = "Property data is required" });
            }

            _logger.LogInformation("Creating new property: {PropertyName}", dto.Name);

            var validation = await _createValidator.ValidateAsync(dto);
            if (!validation.IsValid)
            {
                _logger.LogWarning("Validation failed for property creation: {Errors}", 
                    string.Join(", ", validation.Errors.Select(e => e.ErrorMessage)));
                
                return BadRequest(new 
                { 
                    message = "Validation failed",
                    errors = validation.Errors.Select(e => new { field = e.PropertyName, error = e.ErrorMessage })
                });
            }

            var created = await _service.CreateAsync(dto);
            
            _logger.LogInformation("Successfully created property with id: {PropertyId}", created.Id);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while creating property: {PropertyName}", dto?.Name);
            return StatusCode(500, new { message = "An error occurred while creating the property" });
        }
    }
}
