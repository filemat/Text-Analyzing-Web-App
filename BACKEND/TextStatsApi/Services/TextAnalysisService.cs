using TextStatsApi.Models;
using System.Text.RegularExpressions;
namespace TextStatsApi.Services
{
    public class TextAnalysisService : ITextAnalysisService
    {
        public TextAnalysisResult Analyze(string text)
        {
            var cleanText = text.ToLower();

            var words = Regex.Matches(cleanText, @"\b\w+\b")
                .Select(m => m.Value)
                .ToList();

            int wordCount = words.Count;
            int charCount = text.Count(c => !char.IsWhiteSpace(c));

            var freqDict = new Dictionary<string, int>();
            foreach (var word in words)
            {
                if (freqDict.ContainsKey(word))
                    freqDict[word]++;
                else
                    freqDict[word] = 1;
            }

            var topWords = freqDict.OrderByDescending(kv => kv.Value)
                .Take(5)
                .Select(kv => new WordFrequency
                {
                    Word = kv.Key,
                    Frequency = kv.Value
                })
                .ToList();

            var sentences = Regex.Split(text, @"[\.!\?]+").Where(s => !string.IsNullOrWhiteSpace(s)).ToList();
            double avgSentenceLength = sentences.Count > 0 ? (double)wordCount / sentences.Count : 0;
            double avgWordLength = wordCount > 0 ? (double)charCount / wordCount : 0;
            double readabilityIndex = avgSentenceLength * avgWordLength;

            return new TextAnalysisResult
            {
                WordCount = wordCount,
                CharCount = charCount,
                TopWords = topWords,
                ReadabilityIndex = readabilityIndex
            };
        }
    }
}
