using Microsoft.AspNetCore.Mvc;
using TextStatsApi.Models;
using TextStatsApi.Services;

namespace TextStatsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TextAnalysisController : ControllerBase
    {
        private readonly ITextAnalysisService _textAnalysisService;

        public TextAnalysisController(ITextAnalysisService analysisService)
        {
            _textAnalysisService = analysisService;
        }

        public ActionResult<TextAnalysisService> AnalyzeText([FromBody] TextAnalysisRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.inputText))
            {
                return BadRequest("Input text cannot be empty");
            }

            var result = _textAnalysisService.Analyze(request.inputText);
            return Ok(result);
        }
    }
}
