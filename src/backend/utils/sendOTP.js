// In-memory OTP store (use Redis in prod)
const otpStore = {};

export const sendOTP = async (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = otp;
  console.log(`OTP for ${phone}: ${otp}`); // simulate sending OTP
  return otp;
};

export const verifyOTP = async (phone, otp) => {
  return otpStore[phone] === otp;
};
