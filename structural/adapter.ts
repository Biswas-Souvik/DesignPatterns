// ======= Target Interface =======
// Standard interface expected by the CheckoutService
interface PaymentGateway {
  pay(orderId: string, amount: number): void;
}

// Concrete implementation of PaymentGateway for PayU
class PayUGateway implements PaymentGateway {
  public pay(orderId: string, amount: number): void {
    console.log("Paid Rs." + amount + " using PayU for order: " + orderId);
  }
}

// ======= Adaptee =======
// An existing class with an incompatible interface
class RazorpayAPI {
  public makePayment(invoiceId: string, amountInRupees: number): void {
    console.log(
      "Paid Rs." + amountInRupees + " using Razorpay for invoice: " + invoiceId,
    );
  }
}

// ======= Adapter Class =======
// Allows RazorpayAPI to be used where PaymentGateway is expected
class RazorpayAdapter implements PaymentGateway {
  private razorpayAPI: RazorpayAPI;

  public constructor() {
    this.razorpayAPI = new RazorpayAPI();
  }

  // Translates the pay() call to RazorpayAPI's makePayment() method
  public pay(orderId: string, amount: number): void {
    this.razorpayAPI.makePayment(orderId, amount);
  }
}

// ======= Client Class =======
// Uses PaymentGateway interface to process payments
class CheckoutService {
  private paymentGateway: PaymentGateway;

  // Constructor injection for dependency inversion
  public constructor(paymentGateway: PaymentGateway) {
    this.paymentGateway = paymentGateway;
  }

  // Business logic to perform checkout
  public checkout(orderId: string, amount: number): void {
    this.paymentGateway.pay(orderId, amount);
  }
}

// ======= Client Code =======
function adapter() {
  // Using razorpay payment gateway adapter to process payment
  const checkoutService = new CheckoutService(new RazorpayAdapter());
  checkoutService.checkout("12", 1780);
}

adapter();
