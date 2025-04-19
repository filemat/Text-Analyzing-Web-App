using TextStatsApi.Models;
namespace TextStatsApi.Services
{
    public interface ITextAnalysisService
    {
        TextAnalysisResult Analyze(string text);
    }
}