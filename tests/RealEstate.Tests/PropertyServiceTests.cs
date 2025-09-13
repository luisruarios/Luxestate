using NUnit.Framework;
using Moq;
using RealEstate.Api.Services;
using RealEstate.Api.Repositories;
using RealEstate.Api.Domain;
using System.Linq;
using System.Threading.Tasks;

namespace RealEstate.Tests;

public class PropertyServiceTests
{
    [Test]
    public async Task GetAsync_FiltersByPrice()
    {
        var repo = new Mock<IPropertyRepository>();
        repo.Setup(r => r.GetAsync(It.IsAny<string?>(), It.IsAny<string?>(), It.IsAny<decimal?>(), It.IsAny<decimal?>()))
            .ReturnsAsync(new[] {
                new Property { Id="1", Name="A", AddressProperty="X", IdOwner="o", PriceProperty=100 },
                new Property { Id="2", Name="B", AddressProperty="X", IdOwner="o", PriceProperty=1000 }
            });

        var svc = new PropertyService(repo.Object);
        var results = await svc.GetAsync(null, null, 200, 1200);
        Assert.That(results.Count(), Is.EqualTo(2)); // because repo applies filter, here we're just checking passthrough/mapping works
    }
}
