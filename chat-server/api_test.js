async function runTests() {
  console.log("Starting API Tests...");
  const baseUrl = "http://localhost:8080/api";
  let cookie = "";
  const randomId = Math.floor(Math.random() * 100000);
  const email = `testuser${randomId}@example.com`;
  const password = "password123";
  let myUserId = "";

  const makeRequest = async (path, method = "GET", body = null) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (cookie) options.headers["Cookie"] = cookie;
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${baseUrl}${path}`, options);
    
    // Extract cookie
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
      cookie = setCookie.split(';')[0];
    }

    const data = await res.json().catch(() => null);
    return { status: res.status, data };
  };

  try {
    // 1. Signup
    console.log(`\nTesting POST /auth/signup...`);
    let res = await makeRequest("/auth/signup", "POST", {
      fullName: "Test User",
      email,
      password,
    });
    console.log(`Status: ${res.status}`, res.data);
    myUserId = res.data?._id;

    // 2. Login
    console.log(`\nTesting POST /auth/login...`);
    res = await makeRequest("/auth/login", "POST", { email, password });
    console.log(`Status: ${res.status}`, res.data);

    // 3. Check Auth
    console.log(`\nTesting GET /auth/check...`);
    res = await makeRequest("/auth/check", "GET");
    console.log(`Status: ${res.status}`, res.data);

    // 4. Get Users
    console.log(`\nTesting GET /message/users...`);
    res = await makeRequest("/message/users", "GET");
    console.log(`Status: ${res.status}`, res.data ? `Returned ${res.data.length} users` : null);

    // 5. Send Message (to self as a test)
    console.log(`\nTesting POST /message/send/:id...`);
    res = await makeRequest(`/message/send/${myUserId}`, "POST", { text: "Hello world!" });
    console.log(`Status: ${res.status}`, res.data);

    // 6. Get Messages
    console.log(`\nTesting GET /message/:id...`);
    res = await makeRequest(`/message/${myUserId}`, "GET");
    console.log(`Status: ${res.status}`, res.data ? `Returned ${res.data.length} messages` : null);

    // 7. Update Profile (expecting failure since no image provided)
    console.log(`\nTesting PUT /auth/update-profile...`);
    res = await makeRequest("/auth/update-profile", "PUT", {});
    console.log(`Status: ${res.status}`, res.data);

    // 8. Logout
    console.log(`\nTesting POST /auth/logout...`);
    res = await makeRequest("/auth/logout", "POST");
    console.log(`Status: ${res.status}`, res.data);

    console.log("\nAll tests completed successfully.");
  } catch (error) {
    console.error("Test failed with error:", error);
  }
}

runTests();
