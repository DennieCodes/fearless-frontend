// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get('jwt_access_payload');
const loginButton = document.getElementById('login-button');

if (payloadCookie) {
  // User is logged in. Therefore, add 'd-none' to the login button.
  loginButton.classList.add('d-none');

  // The cookie value is a JSON-formatted string, so parse it
  const encodedPayload = JSON.parse(payloadCookie.value);

  // Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(encodedPayload);

  // The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload);

  // Print the payload
  console.log(payload);

  // Check if "events.add_conference" is in the permissions.
  // If it is, remove 'd-none' from the link
  if (payload.user.perms.includes('events.add_conference')) {
    const newConferenceLink = document.getElementById('new-conference-link');
    newConferenceLink.classList.remove('d-none');
  }

  // Check if "events.add_location" is in the permissions.
  // If it is, remove 'd-none' from the link
  if (payload.user.perms.includes('events.add_location')) {
    const newLocationLink = document.getElementById('new-location-link');
    newLocationLink.classList.remove('d-none');
  }
} else {
  // User is logged out. Therefore, remove 'd-none' from the login button.
  loginButton.classList.remove('d-none');
}
