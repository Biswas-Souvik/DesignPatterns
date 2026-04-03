// ============= Component: Interface ==============
interface Pizza {
  getDescription(): string;
  getCost(): number;
}

// ============= Concrete Components: Base pizza ==============
class PlainPizza implements Pizza {
  getDescription(): string {
    return "Plain Pizza";
  }
  getCost(): number {
    return 10;
  }
}

class MargheritaPizza implements Pizza {
  getDescription(): string {
    return "Margherita Pizza";
  }
  getCost(): number {
    return 15;
  }
}

// ======================== Abstract Decorator ===========================
// ====== Implements Pizza and holds a reference to a Pizza object =======
abstract class PizzaDecorator implements Pizza {
  protected pizza: Pizza;

  constructor(pizza: Pizza) {
    this.pizza = pizza;
  }

  abstract getDescription(): string;

  abstract getCost(): number;
}

// ============ Concrete Decorators ================

// Adds Extra Cheese
class ExtraCheese extends PizzaDecorator {
  constructor(pizza: Pizza) {
    super(pizza);
  }

  getDescription(): string {
    return this.pizza.getDescription() + ", Extra Cheese";
  }

  getCost(): number {
    return this.pizza.getCost() + 30;
  }
}

// Adds Olives
class Olives extends PizzaDecorator {
  constructor(pizza: Pizza) {
    super(pizza);
  }

  getDescription(): string {
    return this.pizza.getDescription() + ", Olives";
  }

  getCost(): number {
    return this.pizza.getCost() + 20;
  }
}

class StuffedCrust extends PizzaDecorator {
  constructor(pizza: Pizza) {
    super(pizza);
  }

  getDescription(): string {
    return this.pizza.getDescription() + ", Stuffed Crust";
  }

  getCost(): number {
    return this.pizza.getCost() + 40;
  }
}

// ======================== Client Code ===========================
function decorator() {
  // Start with a basic Margherita Pizza
  let myPizza: Pizza = new MargheritaPizza();

  // Add Extra Cheese
  myPizza = new ExtraCheese(myPizza);

  // Add Olives
  myPizza = new Olives(myPizza);

  // Add Stuffed Crust
  myPizza = new StuffedCrust(myPizza);

  // Final Description and Cost
  console.log("Pizza Description: " + myPizza.getDescription());
  console.log("Total Cost: ₹" + myPizza.getCost());
}

decorator();
