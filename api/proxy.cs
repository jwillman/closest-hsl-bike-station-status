using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.IO;
using System.Text;


namespace api
{
    public static class proxy
    {
        [FunctionName("proxy")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest request,
            ILogger log)
        {
            string digitransitSubscriptionKey = Environment.GetEnvironmentVariable("DIGITRANSIT_SUBSCRIPTION_KEY");

            var newRequest = new HttpRequestMessage
            {
                Method = new HttpMethod(request.Method),
                RequestUri = new Uri($"https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"),
                Content = new StreamContent(request.Body),
            };

            foreach (var header in request.Headers) {
                if (!newRequest.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray())) {
                    newRequest.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
                }
            }
            newRequest.Headers.Add("digitransit-subscription-key", digitransitSubscriptionKey);

            var ms = new MemoryStream();
            await request.Body.CopyToAsync(ms);
            var requestContent = new StringContent(
                Encoding.UTF8.GetString(ms.ToArray()), Encoding.UTF8, "application/json");
            newRequest.Content = requestContent;

            // TODO this is only for testing, remove:
            // HttpClientHandler clientHandler = new HttpClientHandler();
            // clientHandler.ServerCertificateCustomValidationCallback = 
            //     (sender, cert, chain, sslPolicyErrors) => { return true; };

            var httpClient = new HttpClient(clientHandler);
            var response = await httpClient.SendAsync(newRequest);

            return response;
        }
    }
}

