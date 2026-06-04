const otpStore = new Map();

export const otpRateLimit = (req,res,next) => {

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email Required"
    });
  }

  const now = Date.now();

  const user =otpStore.get(email);

  if (!user) {

    otpStore.set(email, {
      count: 1,
      time: now
    });

    return next();
  }

  const diff =
    now - user.time;

  if (
    diff >
    5 * 60 * 1000
  ) {

    otpStore.set(email, {
      count: 1,
      time: now
    });

    return next();
  }

  if (user.count >= 3) {

    return res.status(429).json({
      success: false,
      message:
        "Too many OTP requests. Try again after 5 minutes."
    });
  }

  user.count++;

  otpStore.set(email, user);

  next();
};