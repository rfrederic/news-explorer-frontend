// Temporary mock backend simulation
let registeredUser = JSON.parse(localStorage.getItem("mockUser")) || null;

// Simulate backend delay
function fakeDelay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Register user
export async function register({ name, email, password }) {
  console.log(" Mock register:", { name, email, password });
  await fakeDelay();
  registeredUser = { _id: "user123", name, email };
  localStorage.setItem("mockUser", JSON.stringify(registeredUser));
  return { message: "Registered successfully!" };
}

// Login user
export async function authorize({ email, password }) {
  console.log(" Mock login:", { email, password });
  await fakeDelay();
  if (!registeredUser || registeredUser.email !== email) {
    throw new Error("Email not found. Please register first.");
  }
  return { token: "fake-jwt-token" };
}

// Check token validity
export async function checkToken(token) {
  console.log(" Mock token check:", token);
  await fakeDelay();
  if (!registeredUser) throw new Error("Invalid token");
  return registeredUser; // return the real registered user
}
