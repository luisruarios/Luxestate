using NUnit.Framework;
using Moq;
using Microsoft.Extensions.Logging;
using RealEstate.Api.Services;
using RealEstate.Api.Repositories;
using RealEstate.Api.Domain;
using RealEstate.Api.DTOs;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace RealEstate.Tests;

[TestFixture]
public class PropertyServiceTests
{
    private Mock<IPropertyRepository> _mockRepository;
    private Mock<ILogger<PropertyService>> _mockLogger;
    private PropertyService _propertyService;

    [SetUp]
    public void Setup()
    {
        _mockRepository = new Mock<IPropertyRepository>();
        _mockLogger = new Mock<ILogger<PropertyService>>();
        _propertyService = new PropertyService(_mockRepository.Object, _mockLogger.Object);
    }

    [Test]
    public async Task GetAsync_WithFilters_ReturnsFilteredProperties()
    {
        // Arrange
        var properties = new List<Property>
        {
            new Property 
            { 
                Id = "1", 
                Name = "Luxury Penthouse", 
                AddressProperty = "Bogotá", 
                IdOwner = "owner1", 
                PriceProperty = 500000,
                Bedrooms = 3,
                Bathrooms = 2,
                Area = 150,
                PropertyType = "Penthouse",
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Property 
            { 
                Id = "2", 
                Name = "Modern Villa", 
                AddressProperty = "Medellín", 
                IdOwner = "owner2", 
                PriceProperty = 1000000,
                Bedrooms = 4,
                Bathrooms = 3,
                Area = 250,
                PropertyType = "Villa",
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        _mockRepository
            .Setup(r => r.GetAsync(It.IsAny<string?>(), It.IsAny<string?>(), It.IsAny<decimal?>(), It.IsAny<decimal?>()))
            .ReturnsAsync(properties);

        // Act
        var results = await _propertyService.GetAsync("Luxury", "Bogotá", 200000, 600000);

        // Assert
        Assert.That(results.Count(), Is.EqualTo(2));
        Assert.That(results.First().Name, Is.EqualTo("Luxury Penthouse"));
        Assert.That(results.First().AddressProperty, Is.EqualTo("Bogotá"));
        _mockRepository.Verify(r => r.GetAsync("Luxury", "Bogotá", 200000, 600000), Times.Once);
    }

    [Test]
    public async Task GetByIdAsync_WithValidId_ReturnsProperty()
    {
        // Arrange
        var property = new Property
        {
            Id = "test-id",
            Name = "Test Property",
            AddressProperty = "Test Address",
            IdOwner = "owner1",
            PriceProperty = 300000,
            Bedrooms = 2,
            Bathrooms = 1,
            Area = 100,
            PropertyType = "Apartment",
            IsAvailable = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            OwnerName = "John Doe",
            OwnerEmail = "john@example.com",
            OwnerPhone = "+57 300 123 4567"
        };

        _mockRepository
            .Setup(r => r.GetByIdAsync("test-id"))
            .ReturnsAsync(property);

        // Act
        var result = await _propertyService.GetByIdAsync("test-id");

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Id, Is.EqualTo("test-id"));
        Assert.That(result.Name, Is.EqualTo("Test Property"));
        Assert.That(result.Owner.Name, Is.EqualTo("John Doe"));
        Assert.That(result.Owner.Email, Is.EqualTo("john@example.com"));
        _mockRepository.Verify(r => r.GetByIdAsync("test-id"), Times.Once);
    }

    [Test]
    public async Task GetByIdAsync_WithInvalidId_ReturnsNull()
    {
        // Arrange
        _mockRepository
            .Setup(r => r.GetByIdAsync("invalid-id"))
            .ReturnsAsync((Property?)null);

        // Act
        var result = await _propertyService.GetByIdAsync("invalid-id");

        // Assert
        Assert.That(result, Is.Null);
        _mockRepository.Verify(r => r.GetByIdAsync("invalid-id"), Times.Once);
    }

    [Test]
    public async Task GetByIdAsync_WithEmptyId_ReturnsNull()
    {
        // Act
        var result = await _propertyService.GetByIdAsync("");

        // Assert
        Assert.That(result, Is.Null);
        _mockRepository.Verify(r => r.GetByIdAsync(It.IsAny<string>()), Times.Never);
    }

    [Test]
    public async Task CreateAsync_WithValidDto_ReturnsCreatedProperty()
    {
        // Arrange
        var createDto = new CreatePropertyDto
        {
            IdOwner = "owner1",
            Name = "New Property",
            AddressProperty = "New Address",
            Description = "A beautiful new property",
            PriceProperty = 400000,
            Bedrooms = 3,
            Bathrooms = 2,
            Area = 120,
            PropertyType = "House",
            Images = new List<string> { "image1.jpg", "image2.jpg" },
            Amenities = new List<string> { "Pool", "Gym" },
            OwnerName = "Jane Doe",
            OwnerEmail = "jane@example.com",
            OwnerPhone = "+57 300 987 6543",
            YearBuilt = 2020,
            IsAvailable = true
        };

        var createdProperty = new Property
        {
            Id = "new-id",
            IdOwner = createDto.IdOwner,
            Name = createDto.Name,
            AddressProperty = createDto.AddressProperty,
            Description = createDto.Description,
            PriceProperty = createDto.PriceProperty,
            Bedrooms = createDto.Bedrooms,
            Bathrooms = createDto.Bathrooms,
            Area = createDto.Area,
            PropertyType = createDto.PropertyType,
            Images = createDto.Images,
            Amenities = createDto.Amenities,
            OwnerName = createDto.OwnerName,
            OwnerEmail = createDto.OwnerEmail,
            OwnerPhone = createDto.OwnerPhone,
            YearBuilt = createDto.YearBuilt,
            IsAvailable = createDto.IsAvailable,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _mockRepository
            .Setup(r => r.CreateAsync(It.IsAny<Property>()))
            .ReturnsAsync(createdProperty);

        // Act
        var result = await _propertyService.CreateAsync(createDto);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Id, Is.EqualTo("new-id"));
        Assert.That(result.Name, Is.EqualTo("New Property"));
        Assert.That(result.Images.Count, Is.EqualTo(2));
        Assert.That(result.Amenities.Count, Is.EqualTo(2));
        _mockRepository.Verify(r => r.CreateAsync(It.IsAny<Property>()), Times.Once);
    }

    [Test]
    public void CreateAsync_WithNullDto_ThrowsArgumentNullException()
    {
        // Act & Assert
        Assert.ThrowsAsync<ArgumentNullException>(() => _propertyService.CreateAsync(null));
        _mockRepository.Verify(r => r.CreateAsync(It.IsAny<Property>()), Times.Never);
    }

    [Test]
    public async Task GetAsync_WhenRepositoryThrowsException_PropagatesException()
    {
        // Arrange
        _mockRepository
            .Setup(r => r.GetAsync(It.IsAny<string?>(), It.IsAny<string?>(), It.IsAny<decimal?>(), It.IsAny<decimal?>()))
            .ThrowsAsync(new Exception("Database error"));

        // Act & Assert
        var ex = Assert.ThrowsAsync<Exception>(() => _propertyService.GetAsync(null, null, null, null));
        Assert.That(ex.Message, Is.EqualTo("Database error"));
    }

    [Test]
    public async Task GetAsync_WithNoFilters_ReturnsAllProperties()
    {
        // Arrange
        var properties = new List<Property>
        {
            new Property 
            { 
                Id = "1", 
                Name = "Property 1", 
                AddressProperty = "Address 1", 
                IdOwner = "owner1",
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        _mockRepository
            .Setup(r => r.GetAsync(null, null, null, null))
            .ReturnsAsync(properties);

        // Act
        var results = await _propertyService.GetAsync(null, null, null, null);

        // Assert
        Assert.That(results.Count(), Is.EqualTo(1));
        _mockRepository.Verify(r => r.GetAsync(null, null, null, null), Times.Once);
    }
}
