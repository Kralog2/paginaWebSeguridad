export function isValidEmail(email: string) {
  email = sanitizeInput(email);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim())
}

export function isValidPassword(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  console.log(password);
  return regex.test(password)
}

export function isValidFullname(name: string) {
  name = sanitizeInput(name);
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{3,50}$/u;
  return regex.test(name.trim())
}

export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .trim();
  return input;
}
