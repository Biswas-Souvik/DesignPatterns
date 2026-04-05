// ==============================
// Strategy Interface
// ==============================
interface MatchingStrategy {
  match(riderLocation: string): void;
}

// ==============================
// Concrete Strategy: Nearest Driver
// ==============================
class NearestDriverStrategy implements MatchingStrategy {
  match(riderLocation: string): void {
    console.log(
      "Matching with the nearest available driver to " + riderLocation,
    );
  }
}

// ==============================
// Concrete Strategy: Airport Queue
// ==============================
class AirportQueueStrategy implements MatchingStrategy {
  match(riderLocation: string): void {
    console.log("Matching using FIFO airport queue for " + riderLocation);
    // Match first-in-line driver for airport pickup
  }
}
// ==============================
// Concrete Strategy: Surge Priority
// ==============================
class SurgePriorityStrategy implements MatchingStrategy {
  match(riderLocation: string): void {
    console.log(
      "Matching rider using surge pricing priority near " + riderLocation,
    );
    // Prioritize high-surge zones or premium drivers
  }
}

// ==============================
// Context Class: RideMatchingService
// ==============================
class RideMatchingService {
  private strategy: MatchingStrategy;

  // Constructor injection of strategy
  public constructor(strategy: MatchingStrategy) {
    this.strategy = strategy;
  }

  // Setter injection for changing strategy dynamically
  public setStrategy(strategy: MatchingStrategy): void {
    this.strategy = strategy;
  }

  // Delegates the matching logic to the strategy
  public matchRider(location: string): void {
    this.strategy.match(location);
  }
}

// ==============================
// Client Code
// ==============================
function strategy() {
  // Using airport queue strategy
  const rideMatchingService = new RideMatchingService(
    new AirportQueueStrategy(),
  );
  rideMatchingService.matchRider("Terminal 1");

  // Using nearest driver strategy and later switching to surge priority
  const rideMatchingService2 = new RideMatchingService(
    new NearestDriverStrategy(),
  );
  rideMatchingService2.matchRider("Downtown");
  rideMatchingService2.setStrategy(new SurgePriorityStrategy());
  rideMatchingService2.matchRider("Downtown");
}

strategy();
