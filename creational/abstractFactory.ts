interface PaymentGateway {
  processPayment(amount: number): void;
}

interface Invoice {
  generateInvoice(): void;
}

// India Implementations
class UPIGateway implements PaymentGateway {
  processPayment(amount: number): void {
    console.log("Processing INR payment through UPI: ", amount);
  }
}

class RazorpayGateway implements PaymentGateway {
  processPayment(amount: number): void {
    console.log("Processing INR payment through Razorpay: ", amount);
  }
}

class GSTInvoice implements Invoice {
  generateInvoice(): void {
    console.log("Generating GST invoice for India.");
  }
}

// US Implementations
class PaypalGateway implements PaymentGateway {
  processPayment(amount: number): void {
    console.log("Processing INR payment through Paypal: ", amount);
  }
}

class StripeGateway implements PaymentGateway {
  processPayment(amount: number): void {
    console.log("Processing INR payment through Stripe: ", amount);
  }
}

class TaxInvoice implements Invoice {
  generateInvoice(): void {
    console.log("Generating Tax invoice for US.");
  }
}

// Abstract Factory
interface RegionFactory {
  createPaymentGateway(gatewayType: string): PaymentGateway;
  createInvoice(): Invoice;
}

class IndiaFactory implements RegionFactory {
  createPaymentGateway(gatewayType: string): PaymentGateway {
    switch (gatewayType) {
      case "UPI":
        return new UPIGateway();
      case "Razorpay":
        return new RazorpayGateway();
      default:
        throw new Error("Invalid gateway type");
    }
  }

  createInvoice(): Invoice {
    return new GSTInvoice();
  }
}

class USFactory implements RegionFactory {
  createPaymentGateway(gatewayType: string): PaymentGateway {
    switch (gatewayType) {
      case "Paypal":
        return new PaypalGateway();
      case "Stripe":
        return new StripeGateway();
      default:
        throw new Error("Invalid gateway type");
    }
  }

  createInvoice(): Invoice {
    return new TaxInvoice();
  }
}

class CheckoutService {
  private paymentGateway: PaymentGateway;
  private invoice: Invoice;
  private gatewayType: string;

  public constructor(factory: RegionFactory, gatewayType: string) {
    this.gatewayType = gatewayType;
    this.paymentGateway = factory.createPaymentGateway(this.gatewayType);
    this.invoice = factory.createInvoice();
  }

  public completeOrder(amount: number) {
    this.paymentGateway.processPayment(amount);
    this.invoice.generateInvoice();
  }
}

// Client Code
function main() {
  const indiaCheckoutService = new CheckoutService(new IndiaFactory(), "UPI");
  indiaCheckoutService.completeOrder(1000);

  console.log("\n" + "=".repeat(50) + "\n");

  const usCheckoutService = new CheckoutService(new USFactory(), "Stripe");
  usCheckoutService.completeOrder(100);
}

main();
