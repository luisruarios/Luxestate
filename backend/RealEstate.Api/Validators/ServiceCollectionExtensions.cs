using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using RealEstate.Api.DTOs;

namespace RealEstate.Api.Validators;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddValidators(this IServiceCollection services)
    {
        services.AddScoped<IValidator<CreatePropertyDto>, CreatePropertyValidator>();
        return services;
    }
}
