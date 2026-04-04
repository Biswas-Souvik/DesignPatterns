// ============= TreeType Class ================
class TreeType {
  // Properties that are common among all trees of this type
  private name: string;
  private color: string;
  private texture: string;

  constructor(name: string, color: string, texture: string) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  public draw(x: number, y: number): void {
    console.log(
      `Drawing ${this.name} tree at (${x}, ${y}) with ${this.color} color and ${this.texture} texture`,
    );
  }
}

// ================ Tree Class =================
class Tree {
  // Attributes that keep on changing
  private x: number;
  private y: number;

  // Attributes that remain constant
  private treeType: TreeType;

  constructor(x: number, y: number, treeType: TreeType) {
    this.x = x;
    this.y = y;
    this.treeType = treeType;
  }

  public draw(): void {
    this.treeType.draw(this.x, this.y);
  }
}

// ============ TreeFactory Class ==============
class TreeFactory {
  static treeTypeMap = new Map<string, TreeType>();

  public static getTreeType(
    name: string,
    color: string,
    texture: string,
  ): TreeType {
    const key = name + " - " + color + " - " + texture;
    let treeType = this.treeTypeMap.get(key);

    if (!treeType) {
      treeType = new TreeType(name, color, texture);
      this.treeTypeMap.set(key, treeType);
    }
    return treeType;
  }
}

// ================ Forest Class =================
class Forest {
  private trees: Tree[] = [];

  public plantTree(
    x: number,
    y: number,
    name: string,
    color: string,
    texture: string,
  ): void {
    const tree = new Tree(x, y, TreeFactory.getTreeType(name, color, texture));
    this.trees.push(tree);
  }

  public draw(): void {
    for (const tree of this.trees) {
      tree.draw();
    }
  }
}

// =============== Client Code ==================
function main() {
  const forest = new Forest();

  // Planting 1 million trees
  for (let i = 0; i < 1_000_000; i++) {
    forest.plantTree(i, i, "Oak", "Green", "Rough");
  }

  console.log("Planted 1 million trees.");
}

main();
