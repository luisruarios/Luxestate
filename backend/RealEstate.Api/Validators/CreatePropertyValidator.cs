using FluentValidation;
using RealEstate.Api.DTOs;

namespace RealEstate.Api.Validators;

public class CreatePropertyValidator : AbstractValidator<CreatePropertyDto>
{
    public CreatePropertyValidator()
    {
        RuleFor(x => x.IdOwner).NotEmpty().WithMessage("Owner ID is required");
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200).WithMessage("Property name is required and must be less than 200 characters");
        RuleFor(x => x.AddressProperty).NotEmpty().MaximumLength(300).WithMessage("Address is required and must be less than 300 characters");
        RuleFor(x => x.Description).NotEmpty().MaximumLength(1000).WithMessage("Description is required and must be less than 1000 characters");

        // At least one pricing option required
        RuleFor(x => x)
            .Must(x => x.PriceProperty.HasValue || x.RentProperty.HasValue)
            .WithMessage("Either sale price or rent price must be specified");

        RuleFor(x => x.PriceProperty)
            .GreaterThan(0)
            .When(x => x.PriceProperty.HasValue)
            .WithMessage("Sale price must be greater than 0");

        RuleFor(x => x.RentProperty)
            .GreaterThan(0)
            .When(x => x.RentProperty.HasValue)
            .WithMessage("Rent price must be greater than 0");

        RuleFor(x => x.Bedrooms).GreaterThanOrEqualTo(0).WithMessage("Bedrooms must be 0 or more");
        RuleFor(x => x.Bathrooms).GreaterThan(0).WithMessage("Bathrooms must be greater than 0");
        RuleFor(x => x.Area).GreaterThan(0).WithMessage("Area must be greater than 0");
        RuleFor(x => x.PropertyType).NotEmpty().WithMessage("Property type is required");
        RuleFor(x => x.YearBuilt).InclusiveBetween(1800, DateTime.Now.Year).WithMessage("Year built must be between 1800 and current year");

        // Images validation
        RuleFor(x => x.Images)
            .Must(images => images.Count >= 3 && images.Count <= 10)
            .WithMessage("Property must have between 3 and 10 images");

        RuleForEach(x => x.Images)
            .NotEmpty()
            .WithMessage("Image URL cannot be empty");

        // Owner contact validation
        RuleFor(x => x.OwnerName).NotEmpty().MaximumLength(100).WithMessage("Owner name is required and must be less than 100 characters");
        RuleFor(x => x.OwnerEmail).NotEmpty().EmailAddress().WithMessage("Valid owner email is required");
        RuleFor(x => x.OwnerPhone).NotEmpty().Matches(@"^[\+]?[0-9\s\-\(\)]{7,20}$").WithMessage("Valid owner phone number is required");
        RuleFor(x => x.OwnerWhatsApp).Matches(@"^[\+]?[0-9\s\-\(\)]{7,20}$").When(x => !string.IsNullOrEmpty(x.OwnerWhatsApp)).WithMessage("WhatsApp number format is invalid");
        RuleFor(x => x.OwnerCompany).MaximumLength(100).WithMessage("Company name must be less than 100 characters");

        // Legacy image field for backward compatibility
        RuleFor(x => x.Image).NotEmpty().When(x => !x.Images.Any()).WithMessage("Image is required if Images list is empty");
    }
}
