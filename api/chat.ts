export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const origin = url.origin;
  const chatHtmlUrl = `${origin}/chat.html`;

  try {
    const response = await fetch(chatHtmlUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch chat.html: ${response.status} ${response.statusText}`,
      );
    }

    let html = await response.text();

    const headers = request.headers;
    const geoData = {
      country: headers.get("X-Vercel-IP-Country") || "",
      region: headers.get("X-Vercel-IP-Country-Region") || "",
      city: headers.get("X-Vercel-IP-City") || "",
    };

    const dataString = JSON.stringify(geoData, null, 2);
    html = html.replace("const data = {}", `const data = ${dataString}`);

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
};
