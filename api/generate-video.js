export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "POST required" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    const body = await request.json();

    const prompt = body.prompt;

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const response = await fetch(
      "https://sisif.ai/api/videos/generate/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SISIF_API_KEY}`
        },

        body: JSON.stringify({
          prompt: prompt,
          duration: Number(body.duration || 5),
          resolution: body.resolution || "720p"
        })
      }
    );

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        status: response.status,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {

    return new Response(
      JSON.stringify({
        error: "Video generation failed",
        details: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
