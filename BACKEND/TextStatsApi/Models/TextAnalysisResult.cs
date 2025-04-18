namespace TextStatsApi.Models
{
    public class TextAnalysisResult
    {
        public int WordCount { get; set; }
        public int CharCount { get; set; }
        public List<WordFrequency> TopWords { get; set; }
        public double ReadabilityIndex { get; set; }
    }
}
