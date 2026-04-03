// Defining the Prototype Interface
interface EmailTemplate {
  clone(): EmailTemplate;
  setContent(content: string): void;
  send(to: string): void;
}

// Concrete Class implementing clone logic
class WelcomeEmail implements EmailTemplate {
  private subject: string;
  private content: string;

  constructor() {
    this.subject = "Welcome to The Ultimate Force";
    this.content = "Hi there! Thanks for joining us.";
  }

  clone(): WelcomeEmail {
    const copy = new WelcomeEmail();
    copy.subject = this.subject;
    copy.content = this.content;
    return copy;
  }

  setContent(content: string): void {
    this.content = content;
  }

  send(to: string): void {
    console.log(`Sending to ${to}: [${this.subject}] ${this.content}`);
  }
}

class DiscountEmail implements EmailTemplate {
  private subject: string;
  private content: string;

  constructor() {
    this.subject = "Discount on The Ultimate Force";
    this.content = "Hi there! Thanks for being a part of The Ultimate Force.";
  }

  clone(): DiscountEmail {
    const copy = new DiscountEmail();
    copy.subject = this.subject;
    copy.content = this.content;
    return copy;
  }

  setContent(content: string): void {
    this.content = content;
  }

  send(to: string): void {
    console.log(`Sending to ${to}: [${this.subject}] ${this.content}`);
  }
}

class FeatureUpdateEmail implements EmailTemplate {
  private subject: string;
  private content: string;

  constructor() {
    this.subject = "Feature Update on The Ultimate Force";
    this.content = "Hi there! Thanks for being a part of The Ultimate Force.";
  }

  clone(): FeatureUpdateEmail {
    const copy = new FeatureUpdateEmail();
    copy.subject = this.subject;
    copy.content = this.content;
    return copy;
  }

  setContent(content: string): void {
    this.content = content;
  }

  send(to: string): void {
    console.log(`Sending to ${to}: [${this.subject}] ${this.content}`);
  }
}

// Template Registry to store and provide clones
class EmailTemplateRegistry {
  private static templates = new Map<string, EmailTemplate>([
    ["welcome", new WelcomeEmail()],
    ["discount", new DiscountEmail()],
    ["feature-update", new FeatureUpdateEmail()],
  ]);

  static getTemplate(type: string): EmailTemplate {
    const template = this.templates.get(type);
    if (!template) throw new Error(`Template "${type}" not found`);
    return template.clone(); // clone to avoid modifying original
  }
}

function prototype() {
  // Driver code
  const welcomeEmail1 = EmailTemplateRegistry.getTemplate("welcome");
  welcomeEmail1.setContent("Hi Alice, welcome to The Ultimate Force!");
  welcomeEmail1.send("alice@example.com");

  const welcomeEmail2 = EmailTemplateRegistry.getTemplate("welcome");
  welcomeEmail2.setContent("Hi Bob, thanks for joining The Ultimate Force!");
  welcomeEmail2.send("bob@example.com");
}

prototype();
