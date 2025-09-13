using RealEstate.Api.Domain;
using RealEstate.Api.Repositories;

namespace RealEstate.Api.Services;

public class DataSeederService : IDataSeederService
{
    private readonly IPropertyRepository _propertyRepository;
    private readonly ILogger<DataSeederService> _logger;

    public DataSeederService(IPropertyRepository propertyRepository, ILogger<DataSeederService> logger)
    {
        _propertyRepository = propertyRepository;
        _logger = logger;
    }

    public async Task SeedDataAsync()
    {
        try
        {
            // Force re-seeding with new enhanced properties
            _logger.LogInformation("Starting enhanced data seeding with 25 properties...");

            // Clear existing properties first
            await _propertyRepository.DeleteAllAsync();
            _logger.LogInformation("Cleared existing properties.");

            var sampleProperties = CreateSampleProperties();

            foreach (var property in sampleProperties)
            {
                await _propertyRepository.CreateAsync(property);
                _logger.LogInformation("Seeded property: {PropertyName}", property.Name);
            }

            _logger.LogInformation("Data seeding completed successfully. Created {Count} properties.", sampleProperties.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred during data seeding");
            throw;
        }
    }

    private static List<Property> CreateSampleProperties()
    {
        var properties = new List<Property>
        {
            // Luxury Properties
            new Property
            {
                IdOwner = "owner-1",
                Name = "Oceanfront Penthouse",
                AddressProperty = "Cra 1 # 100-200, El Prado, Barranquilla",
                Description = "Stunning penthouse with panoramic ocean views, featuring floor-to-ceiling windows, marble finishes, and a private rooftop terrace. Located in the most exclusive area of the city.",
                PriceProperty = 1500000000,
                RentProperty = 8500000,
                Bedrooms = 4,
                Bathrooms = 5,
                Area = 450,
                PropertyType = "Penthouse",
                YearBuilt = 2020,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "parking", "pool", "gym", "security", "elevator", "balcony", "ocean_view", "rooftop_terrace" }
            },
            new Property
            {
                IdOwner = "owner-2",
                Name = "Modern Villa with Pool",
                AddressProperty = "Km 7 Via al Mar, Puerto Colombia",
                Description = "Contemporary architectural masterpiece with infinity pool, smart home automation, and lush tropical gardens. Perfect for luxury living and entertaining.",
                PriceProperty = 2800000000,
                RentProperty = 12000000,
                Bedrooms = 6,
                Bathrooms = 7,
                Area = 650,
                PropertyType = "Villa",
                YearBuilt = 2021,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600563438938-a42d1674d3d9?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "parking", "pool", "garden", "security", "smart_home", "bbq_area", "wine_cellar" }
            },

            // Mid-Range Apartments
            new Property
            {
                IdOwner = "owner-3",
                Name = "Downtown Loft with City Views",
                AddressProperty = "Calle 72 # 43-52, Centro, Barranquilla",
                Description = "Industrial-chic loft in the heart of downtown with exposed brick walls, high ceilings, and stunning city skyline views. Walking distance to restaurants and cultural sites.",
                PriceProperty = 520000000,
                RentProperty = 2800000,
                Bedrooms = 2,
                Bathrooms = 2,
                Area = 120,
                PropertyType = "Loft",
                YearBuilt = 2018,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "parking", "elevator", "city_view", "high_ceilings", "exposed_brick" }
            },
            new Property
            {
                IdOwner = "owner-4",
                Name = "Beachside Apartment",
                AddressProperty = "Cra 54 # 79-200, Bocagrande, Cartagena",
                Description = "Bright and airy apartment just steps from the beach with modern amenities and partial ocean views. Perfect for vacation rental or permanent residence.",
                PriceProperty = 350000000,
                RentProperty = 2200000,
                Bedrooms = 3,
                Bathrooms = 2,
                Area = 95,
                PropertyType = "Apartment",
                YearBuilt = 2017,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "parking", "pool", "beach_access", "balcony", "elevator" }
            },

            // Affordable Housing
            new Property
            {
                IdOwner = "owner-5",
                Name = "Cozy Studio Apartment",
                AddressProperty = "Calle 85 # 47-30, Riomar, Barranquilla",
                Description = "Efficiently designed studio perfect for young professionals or students. Includes modern kitchenette and in-unit laundry. Great location near universities.",
                PriceProperty = 180000000,
                RentProperty = 1200000,
                Bedrooms = 0,
                Bathrooms = 1,
                Area = 45,
                PropertyType = "Studio",
                YearBuilt = 2019,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "laundry", "elevator", "security", "nearby_universities" }
            },

            // Family Homes
            new Property
            {
                IdOwner = "owner-6",
                Name = "Family Home with Garden",
                AddressProperty = "Cra 52 # 84-15, Villa Country, Barranquilla",
                Description = "Spacious family home in quiet residential neighborhood with large backyard, perfect for children and pets. Close to schools and parks.",
                PriceProperty = 450000000,
                RentProperty = 2500000,
                Bedrooms = 4,
                Bathrooms = 3,
                Area = 180,
                PropertyType = "House",
                YearBuilt = 2015,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "parking", "garden", "security", "nearby_schools", "playground" }
            },
            new Property
            {
                IdOwner = "owner-7",
                Name = "Suburban Townhouse",
                AddressProperty = "Conjunto Cerrado Las Flores, Soledad",
                Description = "Modern townhouse in gated community with shared amenities including pool, playground, and 24/7 security. Perfect for growing families.",
                PriceProperty = 320000000,
                RentProperty = 1800000,
                Bedrooms = 3,
                Bathrooms = 2,
                Area = 110,
                PropertyType = "Townhouse",
                YearBuilt = 2020,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "parking", "pool", "security", "playground", "gated_community" }
            },

            // Commercial Properties
            new Property
            {
                IdOwner = "owner-8",
                Name = "Modern Office Space",
                AddressProperty = "Cra 53 # 75-120, World Trade Center, Barranquilla",
                Description = "Premium office space in prestigious business district with panoramic city views, modern amenities, and excellent connectivity.",
                RentProperty = 15000000,
                Bedrooms = 0,
                Bathrooms = 4,
                Area = 300,
                PropertyType = "Office",
                YearBuilt = 2019,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "parking", "elevator", "security", "conference_rooms", "city_view", "reception" }
            },

            // Luxury Apartments
            new Property
            {
                IdOwner = "owner-9",
                Name = "High-Rise Luxury Apartment",
                AddressProperty = "Torre Empresarial, Cra 51B # 79-200, Barranquilla",
                Description = "Sophisticated apartment on the 25th floor with floor-to-ceiling windows, premium finishes, and access to exclusive amenities.",
                PriceProperty = 850000000,
                RentProperty = 4500000,
                Bedrooms = 3,
                Bathrooms = 3,
                Area = 140,
                PropertyType = "Apartment",
                YearBuilt = 2022,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "parking", "pool", "gym", "security", "elevator", "city_view", "concierge" }
            },
            new Property
            {
                IdOwner = "owner-10",
                Name = "Duplex with Private Terrace",
                AddressProperty = "Edificio Palmetto, Cra 54 # 85-30, Barranquilla",
                Description = "Unique duplex apartment with private terrace, double-height ceilings, and premium appliances. Perfect blend of luxury and comfort.",
                PriceProperty = 680000000,
                RentProperty = 3800000,
                Bedrooms = 3,
                Bathrooms = 2,
                Area = 160,
                PropertyType = "Duplex",
                YearBuilt = 2021,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "parking", "elevator", "terrace", "high_ceilings", "premium_appliances" }
            },

            // Vacation Properties
            new Property
            {
                IdOwner = "owner-11",
                Name = "Beach House Getaway",
                AddressProperty = "Playa Blanca, Km 15 Via Cartagena",
                Description = "Charming beach house with direct beach access, perfect for weekend getaways and vacation rentals. Features outdoor shower and hammock area.",
                PriceProperty = 420000000,
                RentProperty = 2800000,
                Bedrooms = 2,
                Bathrooms = 2,
                Area = 85,
                PropertyType = "Beach House",
                YearBuilt = 2016,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "beach_access", "outdoor_shower", "hammock_area", "bbq_area", "parking" }
            },

            // Student Housing
            new Property
            {
                IdOwner = "owner-12",
                Name = "Student Shared Apartment",
                AddressProperty = "Calle 45 # 41-80, Cerca Universidad del Norte",
                Description = "Affordable shared apartment perfect for students, with individual bedrooms and common areas. Walking distance to major universities.",
                RentProperty = 800000,
                Bedrooms = 4,
                Bathrooms = 2,
                Area = 100,
                PropertyType = "Apartment",
                YearBuilt = 2014,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "nearby_universities", "shared_kitchen", "study_area", "laundry" }
            },

            // Investment Properties
            new Property
            {
                IdOwner = "owner-13",
                Name = "Investment Apartment Building",
                AddressProperty = "Calle 76 # 68-120, Boston, Barranquilla",
                Description = "Excellent investment opportunity with 8 rental units, all currently occupied. Consistent rental income in growing neighborhood.",
                PriceProperty = 1200000000,
                Bedrooms = 16,
                Bathrooms = 8,
                Area = 800,
                PropertyType = "Building",
                YearBuilt = 2012,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "parking", "multiple_units", "investment_property", "rental_income" }
            },

            // Rural Properties
            new Property
            {
                IdOwner = "owner-14",
                Name = "Country Estate with Stables",
                AddressProperty = "Vereda La Mesa, Galapa",
                Description = "Expansive country estate with horse stables, fruit trees, and panoramic mountain views. Perfect for equestrian enthusiasts and nature lovers.",
                PriceProperty = 950000000,
                RentProperty = 4200000,
                Bedrooms = 5,
                Bathrooms = 4,
                Area = 350,
                PropertyType = "Estate",
                YearBuilt = 2010,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600563438938-a42d1674d3d9?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "stables", "fruit_trees", "mountain_view", "large_land", "parking", "well_water" }
            },

            // More Mid-Range Options
            new Property
            {
                IdOwner = "owner-15",
                Name = "Garden Apartment Complex",
                AddressProperty = "Conjunto Los Jardines, Malambo",
                Description = "Beautiful garden-style apartment in well-maintained complex with lush landscaping and family-friendly amenities.",
                PriceProperty = 285000000,
                RentProperty = 1600000,
                Bedrooms = 3,
                Bathrooms = 2,
                Area = 85,
                PropertyType = "Apartment",
                YearBuilt = 2018,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "parking", "garden", "playground", "pool", "security" }
            },
            new Property
            {
                IdOwner = "owner-16",
                Name = "Historic Colonial Home",
                AddressProperty = "Centro Histórico, Calle del Arsenal, Cartagena",
                Description = "Beautifully restored colonial home in the heart of Cartagena's historic district. Features original architecture with modern amenities.",
                PriceProperty = 1800000000,
                RentProperty = 8000000,
                Bedrooms = 4,
                Bathrooms = 3,
                Area = 280,
                PropertyType = "Colonial House",
                YearBuilt = 1650,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "historic", "restored", "central_location", "original_architecture", "courtyard" }
            },

            // Compact Living
            new Property
            {
                IdOwner = "owner-17",
                Name = "Micro Loft Downtown",
                AddressProperty = "Calle 70 # 46-25, Centro, Barranquilla",
                Description = "Ultra-modern micro loft with smart storage solutions and premium finishes. Perfect for minimalist urban living.",
                PriceProperty = 195000000,
                RentProperty = 1400000,
                Bedrooms = 1,
                Bathrooms = 1,
                Area = 38,
                PropertyType = "Micro Loft",
                YearBuilt = 2023,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "smart_storage", "modern_design", "central_location", "elevator" }
            },

            // Additional Diverse Properties
            new Property
            {
                IdOwner = "owner-18",
                Name = "Artist's Warehouse Conversion",
                AddressProperty = "Barrio Abajo, Calle 30 # 20-15, Barranquilla",
                Description = "Unique warehouse conversion with soaring ceilings, exposed brick, and artist studio space. Perfect for creative professionals.",
                PriceProperty = 380000000,
                RentProperty = 2200000,
                Bedrooms = 2,
                Bathrooms = 2,
                Area = 150,
                PropertyType = "Warehouse Conversion",
                YearBuilt = 2019,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "high_ceilings", "exposed_brick", "studio_space", "parking", "artistic_neighborhood" }
            },
            new Property
            {
                IdOwner = "owner-19",
                Name = "Eco-Friendly Sustainable Home",
                AddressProperty = "Las Flores, Km 12 Vía Tubará",
                Description = "Innovative eco-friendly home with solar panels, rainwater harvesting, and sustainable materials. Leading the way in green living.",
                PriceProperty = 720000000,
                RentProperty = 3500000,
                Bedrooms = 3,
                Bathrooms = 2,
                Area = 145,
                PropertyType = "Eco House",
                YearBuilt = 2022,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "solar_panels", "rainwater_harvesting", "sustainable_materials", "energy_efficient", "garden" }
            },
            new Property
            {
                IdOwner = "owner-20",
                Name = "Waterfront Cottage",
                AddressProperty = "Ciénaga de Mallorquín, Puerto Colombia",
                Description = "Charming waterfront cottage with private dock and stunning lagoon views. Perfect for weekend retreats and water sports enthusiasts.",
                PriceProperty = 480000000,
                RentProperty = 2600000,
                Bedrooms = 2,
                Bathrooms = 2,
                Area = 75,
                PropertyType = "Cottage",
                YearBuilt = 2017,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "private_dock", "waterfront", "lagoon_view", "water_sports", "fishing" }
            },

            // Final set to reach 25
            new Property
            {
                IdOwner = "owner-21",
                Name = "Executive Business Suite",
                AddressProperty = "Torre Colpatria, Cra 50 # 80-200, Barranquilla",
                Description = "Premium executive suite in prestigious business tower with concierge services and meeting facilities. Ideal for business travelers.",
                RentProperty = 6500000,
                Bedrooms = 1,
                Bathrooms = 1,
                Area = 65,
                PropertyType = "Business Suite",
                YearBuilt = 2021,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "concierge", "meeting_facilities", "business_center", "elevator", "city_view" }
            },
            new Property
            {
                IdOwner = "owner-22",
                Name = "Family Duplex with Patio",
                AddressProperty = "Villa Santos, Calle 84 # 55-40, Barranquilla",
                Description = "Spacious family duplex with large patio area, perfect for children and entertaining. Quiet residential street with excellent schools nearby.",
                PriceProperty = 410000000,
                RentProperty = 2300000,
                Bedrooms = 4,
                Bathrooms = 3,
                Area = 165,
                PropertyType = "Duplex",
                YearBuilt = 2016,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "patio", "parking", "nearby_schools", "quiet_street", "family_friendly" }
            },
            new Property
            {
                IdOwner = "owner-23",
                Name = "Modern Industrial Apartment",
                AddressProperty = "Zona Industrial, Calle 30 # 46-80, Barranquilla",
                Description = "Contemporary apartment in converted industrial building with exposed concrete, steel beams, and floor-to-ceiling windows.",
                PriceProperty = 340000000,
                RentProperty = 2100000,
                Bedrooms = 2,
                Bathrooms = 2,
                Area = 90,
                PropertyType = "Industrial Apartment",
                YearBuilt = 2020,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "exposed_concrete", "steel_beams", "floor_to_ceiling_windows", "parking", "industrial_design" }
            },
            new Property
            {
                IdOwner = "owner-24",
                Name = "Luxury Condo with Marina View",
                AddressProperty = "Marina Internacional, Puerto Colombia",
                Description = "Exclusive condominium overlooking the international marina with yacht club access and premium amenities. Sophisticated coastal living.",
                PriceProperty = 1200000000,
                RentProperty = 6800000,
                Bedrooms = 3,
                Bathrooms = 3,
                Area = 185,
                PropertyType = "Luxury Condo",
                YearBuilt = 2023,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "marina_view", "yacht_club_access", "premium_amenities", "parking", "security", "balcony" }
            },
            new Property
            {
                IdOwner = "owner-25",
                Name = "Retirement Community Villa",
                AddressProperty = "Conjunto Sunset Hills, Km 20 Vía al Mar",
                Description = "Beautiful villa in exclusive retirement community with healthcare facilities, golf course, and 24/7 medical assistance. Perfect for golden years.",
                PriceProperty = 680000000,
                RentProperty = 3200000,
                Bedrooms = 2,
                Bathrooms = 2,
                Area = 120,
                PropertyType = "Retirement Villa",
                YearBuilt = 2019,
                Images = new List<string>
                {
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
                },
                Amenities = new List<string> { "healthcare_facilities", "golf_course", "medical_assistance", "retirement_community", "parking", "garden" }
            }
        };

        // Assign owner contact information to each property
        var owners = CreateOwnerProfiles();
        foreach (var property in properties)
        {
            var owner = owners.FirstOrDefault(o => o.Id == property.IdOwner);
            if (owner != null)
            {
                property.OwnerName = owner.Name;
                property.OwnerEmail = owner.Email;
                property.OwnerPhone = owner.Phone;
                property.OwnerWhatsApp = owner.WhatsApp;
                property.OwnerCompany = owner.Company;
                property.OwnerProfileImage = owner.ProfileImage;
                property.IsOwnerAgent = owner.IsAgent;
                property.IsOwnerVerified = owner.IsVerified;
            }
        }

        return properties;
    }

    private static List<Owner> CreateOwnerProfiles()
    {
        return new List<Owner>
        {
            new Owner { Id = "owner-1", Name = "Carlos Rodriguez", Email = "carlos.rodriguez@luxuryproperties.com", Phone = "+57 300 123 4567", WhatsApp = "+57 300 123 4567", Company = "Luxury Properties Colombia", ProfileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-2", Name = "Sofia Martinez", Email = "sofia.martinez@coastalrealty.co", Phone = "+57 301 234 5678", WhatsApp = "+57 301 234 5678", Company = "Coastal Realty", ProfileImage = "https://images.unsplash.com/photo-1494790108755-2616b612b1ba?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-3", Name = "Diego Fernandez", Email = "diego.fernandez@urbanspaces.com", Phone = "+57 302 345 6789", WhatsApp = "+57 302 345 6789", Company = "Urban Spaces", ProfileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-4", Name = "Maria Elena Vasquez", Email = "maria.vasquez@beachproperties.co", Phone = "+57 303 456 7890", WhatsApp = "+57 303 456 7890", Company = "Beach Properties", ProfileImage = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-5", Name = "Andres Gomez", Email = "andres.gomez@gmail.com", Phone = "+57 304 567 8901", WhatsApp = "+57 304 567 8901", Company = "", ProfileImage = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", IsAgent = false, IsVerified = true },
            new Owner { Id = "owner-6", Name = "Patricia Lopez", Email = "patricia.lopez@familyhomes.co", Phone = "+57 305 678 9012", WhatsApp = "+57 305 678 9012", Company = "Family Homes Realty", ProfileImage = "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-7", Name = "Roberto Silva", Email = "roberto.silva@communityspaces.com", Phone = "+57 306 789 0123", WhatsApp = "+57 306 789 0123", Company = "Community Spaces", ProfileImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-8", Name = "Claudia Morales", Email = "claudia.morales@commercialrealty.co", Phone = "+57 307 890 1234", WhatsApp = "+57 307 890 1234", Company = "Commercial Realty Solutions", ProfileImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-9", Name = "Fernando Ramirez", Email = "fernando.ramirez@premiumapartments.co", Phone = "+57 308 901 2345", WhatsApp = "+57 308 901 2345", Company = "Premium Apartments", ProfileImage = "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-10", Name = "Valentina Herrera", Email = "valentina.herrera@duplexhomes.co", Phone = "+57 309 012 3456", WhatsApp = "+57 309 012 3456", Company = "Duplex Homes", ProfileImage = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-11", Name = "Gabriel Torres", Email = "gabriel.torres@beachgetaways.co", Phone = "+57 310 123 4567", WhatsApp = "+57 310 123 4567", Company = "Beach Getaways", ProfileImage = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-12", Name = "Camila Ruiz", Email = "camila.ruiz@studenthousing.co", Phone = "+57 311 234 5678", WhatsApp = "+57 311 234 5678", Company = "Student Housing Solutions", ProfileImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-13", Name = "Ricardo Mendoza", Email = "ricardo.mendoza@investmentproperties.co", Phone = "+57 312 345 6789", WhatsApp = "+57 312 345 6789", Company = "Investment Properties Group", ProfileImage = "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-14", Name = "Elena Castillo", Email = "elena.castillo@countrystates.co", Phone = "+57 313 456 7890", WhatsApp = "+57 313 456 7890", Company = "Country Estates", ProfileImage = "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-15", Name = "Manuel Jimenez", Email = "manuel.jimenez@gardenproperties.co", Phone = "+57 314 567 8901", WhatsApp = "+57 314 567 8901", Company = "Garden Properties", ProfileImage = "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-16", Name = "Isabella Santos", Email = "isabella.santos@historicproperties.co", Phone = "+57 315 678 9012", WhatsApp = "+57 315 678 9012", Company = "Historic Properties Cartagena", ProfileImage = "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-17", Name = "Sebastian Vargas", Email = "sebastian.vargas@microliving.co", Phone = "+57 316 789 0123", WhatsApp = "+57 316 789 0123", Company = "Micro Living Solutions", ProfileImage = "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-18", Name = "Lucia Moreno", Email = "lucia.moreno@artisticspaces.co", Phone = "+57 317 890 1234", WhatsApp = "+57 317 890 1234", Company = "Artistic Spaces", ProfileImage = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-19", Name = "Alejandro Rivera", Email = "alejandro.rivera@ecohomes.co", Phone = "+57 318 901 2345", WhatsApp = "+57 318 901 2345", Company = "Eco Homes Colombia", ProfileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-20", Name = "Natalia Cruz", Email = "natalia.cruz@waterfrontproperties.co", Phone = "+57 319 012 3456", WhatsApp = "+57 319 012 3456", Company = "Waterfront Properties", ProfileImage = "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-21", Name = "Miguel Gutierrez", Email = "miguel.gutierrez@executivesuites.co", Phone = "+57 320 123 4567", WhatsApp = "+57 320 123 4567", Company = "Executive Suites", ProfileImage = "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-22", Name = "Carmen Delgado", Email = "carmen.delgado@familyduplexes.co", Phone = "+57 321 234 5678", WhatsApp = "+57 321 234 5678", Company = "Family Duplexes", ProfileImage = "https://images.unsplash.com/photo-1494790108755-2616b612b1ba?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-23", Name = "Javier Pena", Email = "javier.pena@industrialliving.co", Phone = "+57 322 345 6789", WhatsApp = "+57 322 345 6789", Company = "Industrial Living", ProfileImage = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-24", Name = "Andrea Salazar", Email = "andrea.salazar@marinaluxury.co", Phone = "+57 323 456 7890", WhatsApp = "+57 323 456 7890", Company = "Marina Luxury", ProfileImage = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true },
            new Owner { Id = "owner-25", Name = "Ernesto Vega", Email = "ernesto.vega@retirementcommunities.co", Phone = "+57 324 567 8901", WhatsApp = "+57 324 567 8901", Company = "Retirement Communities", ProfileImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face", IsAgent = true, IsVerified = true }
        };
    }
}
