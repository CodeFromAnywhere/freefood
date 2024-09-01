// Mock database insert function
const mockDbInsert = async (data: any) => {
  // Simulating database insert
  console.log("Inserting data into database:", data);
  return { success: true };
};

export const POST = async (request: Request) => {
  try {
    const form = await request.formData();

    const data: any = {};
    form.forEach((value, key) => {
      data[key] = value;
    });
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

    // Return the response with the contents of thanks.html
    return new Response("Redirecting", {
      status: 307,
      headers: {
        Location:
          new URL(request.url).origin +
          `/thanks.html?budget=${budget}&people=${people}`,
      },
    });
  } catch (error) {
    // Handle any errors
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
