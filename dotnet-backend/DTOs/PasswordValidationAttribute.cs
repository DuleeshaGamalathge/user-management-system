using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace dotnet_backend.DTOs;

public class PasswordValidationAttribute : ValidationAttribute
{
    private readonly bool _allowEmpty;

    public PasswordValidationAttribute(bool allowEmpty = false)
    {
        _allowEmpty = allowEmpty;
        ErrorMessage = "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character, with no spaces.";
    }

    protected override ValidationResult? IsValid(
        object? value,
        ValidationContext validationContext)
    {
        if (_allowEmpty && string.IsNullOrEmpty(value as string))
            return ValidationResult.Success;

        if (value is not string password)
        {
            return new ValidationResult(ErrorMessage);
        }

        var pattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])\S{8,}$";

        if (!Regex.IsMatch(password, pattern))
        {
            return new ValidationResult(ErrorMessage);
        }

        return ValidationResult.Success;
    }
}