using TextStatsApi.Models;
namespace TextStatsApi.Services
{
    public interface ITextAnalysisService
    {
        TextAnalysisResult Analalyze(string text);
    }
}
