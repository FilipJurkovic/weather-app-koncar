namespace backend.DTOs.Statistics;

public class RecentSearchDto
{
    public string City { get; set; } = string.Empty;
    public string WeatherCondition { get; set; } = string.Empty;
    public double Temperature { get; set; }
    public DateTime SearchedAt { get; set; }
}
