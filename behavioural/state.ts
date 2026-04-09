/**
 * State Pattern
Formal Definition
The State Pattern is a behavioral design pattern that encapsulates state-specific behavior into separate classes and delegates the behavior to the appropriate state object. This allows the object to change its behavior without altering the underlying code.

This pattern makes it easy to manage state transitions by isolating state-specific behavior into distinct classes. It helps achieve loose coupling by ensuring that each state class is independent and can evolve without affecting others.
Real-Life Analogy
Consider a food delivery app. As an order progresses, its state changes through multiple stages:
The order is placed.
The order is being prepared.
A delivery partner is assigned.
The order is picked up.
The order is out for delivery.
Finally, the order is delivered.

At each stage, the app behaves differently:
In the "Order Placed" state, you can cancel the order.
In the "Order Preparing" state, you can track the preparation status.
In the "Delivery Partner Assigned" state, you can see the details of the assigned driver.
And so on until the order is delivered.

Each of these states represents a distinct phase, and the app's behavior changes based on which state the order is in. The State Pattern manages these transitions seamlessly, with each state class controlling the behavior for that phase. It also follows Open Closed Principle (OCP), as states can be added without modifying the existing code.
 */

// OrderContext class manages the current state of the order
class OrderContext {
  private currentState: OrderState;

  // Constructor initializes the state to ORDER_PLACED
  public constructor() {
    this.currentState = new OrderPlacedState(); // default state
  }

  // Method to set a new state for the order
  public setState(state: OrderState) {
    this.currentState = state;
  }

  // Method to move the order to the next state
  public next() {
    this.currentState.next(this);
  }

  // Method to cancel the order
  public cancel() {
    this.currentState.cancel(this);
  }

  // Method to get the current state of the order
  public getCurrentState(): string {
    return this.currentState.getStateName();
  }
}

// OrderState interface defines the behavior of the order states
interface OrderState {
  next(context: OrderContext): void; // Move to the next state
  cancel(context: OrderContext): void; // Cancel the order
  getStateName(): string; // Get the name of the state
}

enum OrderStateEnum {
  ORDER_PLACED = "ORDER_PLACED",
  PREPARING = "PREPARING",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

// Concrete states for each stage of the order

// OrderPlacedState handles the behavior when the order is placed
class OrderPlacedState implements OrderState {
  public next(context: OrderContext): void {
    context.setState(new PreparingState());
    console.log("Order is now being prepared.");
  }

  public cancel(context: OrderContext): void {
    context.setState(new CancelledState());
    console.log("Order has been cancelled.");
  }

  public getStateName(): string {
    return OrderStateEnum.ORDER_PLACED;
  }
}

// PreparingState handles the behavior when the order is being prepared
class PreparingState implements OrderState {
  public next(context: OrderContext): void {
    context.setState(new OutForDeliveryState());
    console.log("Order is out for delivery.");
  }

  public cancel(context: OrderContext): void {
    context.setState(new CancelledState());
    console.log("Order has been cancelled.");
  }

  public getStateName(): string {
    return OrderStateEnum.PREPARING;
  }
}

// OutForDeliveryState handles the behavior when the order is out for delivery
class OutForDeliveryState implements OrderState {
  public next(context: OrderContext): void {
    context.setState(new DeliveredState());
    console.log("Order has been delivered.");
  }

  public cancel(context: OrderContext): void {
    console.log("Cannot cancel. Order is out for delivery.");
  }

  public getStateName(): string {
    return OrderStateEnum.OUT_FOR_DELIVERY;
  }
}

// DeliveredState handles the behavior when the order is delivered
class DeliveredState implements OrderState {
  public next(context: OrderContext): void {
    console.log("Order is already delivered.");
  }

  public cancel(context: OrderContext): void {
    console.log("Cannot cancel a delivered order.");
  }

  public getStateName(): string {
    return OrderStateEnum.DELIVERED;
  }
}

// CancelledState handles the behavior when the order is cancelled
class CancelledState implements OrderState {
  public next(context: OrderContext): void {
    console.log("Cancelled order cannot move to next state.");
  }

  public cancel(context: OrderContext): void {
    console.log("Order is already cancelled.");
  }

  public getStateName(): string {
    return OrderStateEnum.CANCELLED;
  }
}

function state() {
  const order = new OrderContext();

  // Display initial state
  console.log("Current State: " + order.getCurrentState());

  // Moving through states
  order.next(); // ORDER_PLACED -> PREPARING
  order.next(); // PREPARING -> OUT_FOR_DELIVERY
  order.cancel(); // Should fail, as order is out for delivery
  order.next(); // OUT_FOR_DELIVERY -> DELIVERED
  order.cancel(); // Should fail, as order is delivered

  // Display final state
  console.log("Final State: " + order.getCurrentState());
}

state();
