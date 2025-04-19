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

            var sentences = Regex.Split(text, @"[\.!\?]+")
                                  .Where(s => !string.IsNullOrWhiteSpace(s))
                                  .ToList();
            int sentenceCount = sentences.Count;

            double avgSentenceLength = sentenceCount > 0
                ? (double)wordCount / sentenceCount
                : 0;

            int totalSyllables = words.Sum(word => EstimateSyllables(word));

            double readabilityIndex = (wordCount > 0 && sentenceCount > 0)
                ? 206.835 - 1.015 * ((double)wordCount / sentenceCount)
                          - 84.6 * ((double)totalSyllables / wordCount)
                : 0;

            return new TextAnalysisResult
            {
                WordCount = wordCount,
                CharCount = charCount,
                TopWords = topWords,
                ReadabilityIndex = readabilityIndex
            };
        }

        private int EstimateSyllables(string word)
        {
            word = word.ToLower().Trim();
            if (word.Length == 0) return 0;

            int syllables = Regex.Matches(word, @"[aeiouy]+").Count;

            if (word.EndsWith("e"))
                syllables--;

            if (syllables < 1)
                syllables = 1;

            return syllables;
        }
    }
}