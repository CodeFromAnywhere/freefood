export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    // Destructure the required fields from the request body
    const {
      address,
      postalCode,
      city,
      country,
      email,
      phoneNumber,
      fullName,
      message,
      budget,
      people,
    } = data;

    // Mock database insert function
    const mockDbInsert = async (data: any) => {
      // Simulating database insert
      console.log("Inserting data into database:", data);
      return { success: true };
    };

    // Insert data into mock database
    await mockDbInsert({
      address,
      postalCode,
      city,
      country,
      email,
      phoneNumber,
      fullName,
      message,
      budget,
      people,
    });

    // Fetch the contents of thanks.html from the same origin
    const thanksHtmlResponse = await fetch(new URL("thanks.html", request.url));
    const thanksHtmlContent = await thanksHtmlResponse.text();

    // Return the response with the contents of thanks.html
    return new Response(thanksHtmlContent, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    // Handle any errors
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
