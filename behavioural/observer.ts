// ==============================
// Observer Interface
// ==============================
interface Subscriber {
  update(videoTitle: string): void;
}

// ==============================
// Concrete Observer: Email
// ==============================
class EmailSubscriber implements Subscriber {
  private email: string;

  public constructor(email: string) {
    this.email = email;
  }

  public update(videoTitle: string): void {
    console.log(
      "Email sent to " + this.email + ": New video uploaded - " + videoTitle,
    );
  }
}

// ==============================
// Concrete Observer: Mobile App
// ==============================
class MobileAppSubscriber implements Subscriber {
  private username: string;

  public constructor(username: string) {
    this.username = username;
  }

  public update(videoTitle: string): void {
    console.log(
      `In-app notification for ${this.username}: New video - ${videoTitle}`,
    );
  }
}

// ==============================
// Subject Interface
// ==============================
interface Channel {
  subscribe(subscriber: Subscriber): void;
  unsubscribe(subscriber: Subscriber): void;
  notifySubscribers(videoTitle: string): void;
}

// ==============================
// Concrete Subject: YouTubeChannel
// ==============================
class YouTubeChannel implements Channel {
  private subscribers: Subscriber[] = [];
  private channelName: string;

  public constructor(channelName: string) {
    this.channelName = channelName;
  }

  public subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: Subscriber): void {
    this.subscribers.filter((sub) => sub !== subscriber);
  }

  public notifySubscribers(videoTitle: string): void {
    for (const subscriber of this.subscribers) {
      subscriber.update(videoTitle);
    }
  }

  // Simulates video upload and triggers notifications
  public uploadVideo(videoTitle: string): void {
    console.log(this.channelName + " uploaded: " + videoTitle + "\n");
    this.notifySubscribers(videoTitle);
  }
}

// ==============================
// Client Code
// ==============================
function observer() {
  const tuf: YouTubeChannel = new YouTubeChannel("takeUforward");

  // Add subscribers
  tuf.subscribe(new MobileAppSubscriber("raj"));
  tuf.subscribe(new EmailSubscriber("rahul@example.com"));

  // Upload video and notify all observers
  tuf.uploadVideo("observer-pattern");
}

observer();
