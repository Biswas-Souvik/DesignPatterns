// Interface for items that can be added to the cart
interface CartItem {
  getPrice(): number;
  display(indent: string): void;
}

// Product class implementing CartItem
class Product implements CartItem {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  public getPrice(): number {
    return this.price;
  }

  public display(indent: string): void {
    console.log(indent + "Product: " + this.name + " - ₹" + this.price);
  }
}

// ProductBundle class implementing CartItem
class ProductBundle implements CartItem {
  private bundleName: string;
  private items: CartItem[] = [];

  constructor(bundleName: string) {
    this.bundleName = bundleName;
  }

  public addItem(item: CartItem) {
    this.items.push(item);
  }

  public getPrice(): number {
    let total = 0;
    for (const item of this.items) {
      total += item.getPrice();
    }
    return total;
  }

  public display(indent: string): void {
    console.log(indent + "Bundle: " + this.bundleName);
    for (const item of this.items) {
      item.display(indent + "  ");
    }
  }
}

// Main class
function composite() {
  // Individual Products
  const book: CartItem = new Product("Atomic Habits", 499);
  const phone: CartItem = new Product("iPhone 15", 79999);
  const earbuds: CartItem = new Product("AirPods", 15999);
  const charger: CartItem = new Product("20W Charger", 1999);

  // Combo Deal
  const iphoneCombo: ProductBundle = new ProductBundle(
    "iPhone Essentials Combo",
  );
  iphoneCombo.addItem(phone);
  iphoneCombo.addItem(earbuds);
  iphoneCombo.addItem(charger);

  // Back to School Kit
  const schoolKit: ProductBundle = new ProductBundle("Back to School Kit");
  schoolKit.addItem(new Product("Notebook Pack", 249));
  schoolKit.addItem(new Product("Pen Set", 99));
  schoolKit.addItem(new Product("Highlighter", 149));

  // Add everything to cart
  const cart: CartItem[] = [];
  cart.push(book);
  cart.push(iphoneCombo);
  cart.push(schoolKit);

  // Display cart
  console.log("Your Amazon Cart:");
  let total = 0;
  for (const item of cart) {
    item.display("  ");
    total += item.getPrice();
  }

  console.log("\nTotal: ₹" + total);
}

composite();
