/*
Template Pattern
Formal Definition
The Template Pattern is a behavioral design pattern that provides a blueprint for executing an algorithm. It allows subclasses to override specific steps of the algorithm, but the overall structure remains the same. This ensures that the invariant parts of the algorithm are not changed, while enabling customization in the variable parts.
Real Life Analogy
Imagine you are following a recipe to bake a cake. The overall process of baking a cake (preheat oven, mix ingredients, bake, and cool) is fixed, but the specific ingredients or flavors may vary (chocolate, vanilla, etc.).

The Template Pattern is like the recipe: it defines the basic structure of the process(steps), while allowing the specific ingredients(or steps) to be varied depending on the cake type.
*/

// Abstract class defining the template method and common steps
abstract class NotificationSender {
  // Template method
  public send(to: string, rawMessage: string): void {
    // Common Logic
    this.rateLimitCheck(to);
    this.validateRecipient(to);
    const formatted = this.formatMessage(rawMessage);
    this.preSendAuditLog(to, formatted);

    // Specific Logic: defined by subclassese
    const composedMessage = this.composeMessage(formatted);
    this.sendMessage(to, composedMessage);

    // Optional Hook
    this.postSendAnalytics(to);
  }

  // Common step 1: Check rate limits
  private rateLimitCheck(to: string): void {
    console.log("Checking rate limits for: " + to);
  }

  // Common step 2: Validate recipient
  private validateRecipient(to: string): void {
    console.log("Validating recipient: " + to);
  }

  // Common step 3: Format the message (can be customized)
  private formatMessage(message: string): string {
    return message.trim(); // could include HTML escaping, emoji processing, etc.
  }

  // Common step 4: Pre-send audit log
  private preSendAuditLog(to: string, formatted: string): void {
    console.log("Logging before send: " + formatted + " to " + to);
  }

  // Hook for subclasses to implement custom message composition
  protected abstract composeMessage(formattedMessage: string): string;

  // Hook for subclasses to implement custom message sending
  protected abstract sendMessage(to: string, message: string): void;

  // Optional hook for analytics (can be overridden)
  protected postSendAnalytics(to: string): void {
    console.log("Analytics updated for: " + to);
  }
}

// Concrete class for email notifications
class EmailNotification extends NotificationSender {
  // Implement message composition for email
  protected composeMessage(formattedMessage: string): string {
    return "<html><body><p>" + formattedMessage + "</p></body></html>";
  }

  // Implement email sending logic
  protected sendMessage(to: string, message: string): void {
    console.log("Sending EMAIL to " + to + " with content:\n" + message);
  }
}

// Concrete class for SMS notifications
class SMSNotification extends NotificationSender {
  // Implement message composition for SMS
  protected composeMessage(formattedMessage: string): string {
    return "[SMS] " + formattedMessage;
  }

  // Implement SMS sending logic
  protected sendMessage(to: string, message: string): void {
    console.log("Sending SMS to " + to + " with message: " + message);
  }

  // Override optional hook for custom SMS analytics
  protected postSendAnalytics(to: string): void {
    console.log("Custom SMS analytics for: " + to);
  }
}

// Client code

function templatePattern() {
  const emailSender = new EmailNotification();
  emailSender.send("john@example.com", "Hello World!");

  console.log(" ");

  const smsSender = new SMSNotification();
  smsSender.send("9876543210", "Your OTP is 4567.");
}

templatePattern;
