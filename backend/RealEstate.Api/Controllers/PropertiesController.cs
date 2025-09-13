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

    public PropertiesController(IPropertyService service, IValidator<CreatePropertyDto> createValidator)
    {
        _service = service;
        _createValidator = createValidator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PropertyDto>>> Get([FromQuery] string? name, [FromQuery] string? address, [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice)
    {
        var results = await _service.GetAsync(name, address, minPrice, maxPrice);
        return Ok(results);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PropertyDto>> GetById(string id)
    {
        var item = await _service.GetByIdAsync(id);
        if (item is null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<PropertyDto>> Create([FromBody] CreatePropertyDto dto)
    {
        var validation = await _createValidator.ValidateAsync(dto);
        if (!validation.IsValid) return BadRequest(validation.Errors);

        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
}
