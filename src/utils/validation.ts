/**
 * Form validation utilities for StayWell
 */

export const validateName = (name: string): string | null => {
  if (!name.trim()) return "This field is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  if (!/^[a-zA-Z\s]+$/.test(name)) return "Only letters and spaces allowed";
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "This field is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format (e.g. example@email.com)";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "This field is required";
  if (password.length < 8) return "Minimum 8 characters";
  if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Include at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Include at least one number";
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return "This field is required";
  // Basic numeric validation, can be adjusted for specific local formats
  if (!/^\+?[0-9\s-]{8,15}$/.test(phone)) return "Invalid phone number format";
  return null;
};

export const validateCardNumber = (cardNumber: string): string | null => {
  if (!cardNumber.trim()) return "This field is required";
  const clean = cardNumber.replace(/\s+/g, "");
  if (!/^\d{16}$/.test(clean)) return "Card number must be 16 digits";
  return null;
};

export const validateExpiry = (expiry: string): string | null => {
  if (!expiry.trim()) return "This field is required";
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return "Use MM/YY format";
  
  const [month, year] = expiry.split("/").map(Number);
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (month < 1 || month > 12) return "Invalid month";
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return "Expiry date must be in the future";
  }
  return null;
};

export const validateCVV = (cvv: string): string | null => {
  if (!cvv.trim()) return "This field is required";
  if (!/^\d{3,4}$/.test(cvv)) return "CVV must be 3 or 4 digits";
  return null;
};

/**
 * Basic XSS sanitization - strips <script> tags and escapes common HTML special characters
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
    .replace(/[<>\"\'&]/g, (match) => {
      const escape: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "&": "&amp;",
      };
      return escape[match] || match;
    })
    .trim();
};
