// src/lib/razorpayClient.js
export const openRazorpay = (order, user) => {
  return new Promise((resolve, reject) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Job Portal",
      description: "Access job details for 1 year",
      order_id: order.id,
      handler: function (response) {
        resolve(response);
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};
