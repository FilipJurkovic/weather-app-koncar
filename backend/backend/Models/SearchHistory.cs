namespace backend.Models;

public class SearchHistory
{
    public int Id { get; set; }

    // FK prema User tablici
    public int UserId { get; set; }

    public string City { get; set; } = string.Empty;

    // Vremenski uvjet kojeg OpenWeather vraća: "Clear", "Rain", "Clouds", "Snow"...
    public string WeatherCondition { get; set; } = string.Empty;

    public double Temperature { get; set; }

    // Period za koji je korisnik gledao prognozu
    public DateTime PeriodFrom { get; set; }
    public DateTime PeriodTo { get; set; }

    // Kada je pretraga napravljena
    public DateTime SearchedAt { get; set; } = DateTime.UtcNow;

    // Navigation property - EF Core koristi ovo za JOIN prema User tablici
    public User User { get; set; } = null!;
}