// Command Pattern
// The Command Pattern is a behavioral design pattern that turns a request into a separate object, allowing you to decouple the code that issues the request from the code that performs it.
// Formal Definition
// The Command Pattern is a behavioral design pattern that encapsulates a request as an object, allowing for parameterization of clients with different requests, queuing of requests, and logging of the requests. It lets you add features like undo, redo, logging, and dynamic command execution without changing the core business logic.

// This allows you to execute commands at a later time, in a flexible manner, without having to interact directly with the request's execution details.

// ==============================

// ========= Receiver classes ===========
// Light and AC with basic on/off methods
class Light {
  public on(): void {
    console.log("Light turned ON");
  }

  public off(): void {
    console.log("Light turned OFF");
  }
}

class AC {
  public on(): void {
    console.log("AC turned ON");
  }

  public off(): void {
    console.log("AC turned OFF");
  }
}

// ========= Command interface ===========
//    defines the command structure
interface Command {
  execute(): void;
  undo(): void;
}

// Concrete commands for Light ON and OFF
class LightOnCommand implements Command {
  private light: Light;

  public constructor(light: Light) {
    this.light = light;
  }

  public execute(): void {
    this.light.on();
  }

  public undo(): void {
    this.light.off();
  }
}

class LightOffCommand implements Command {
  private light: Light;

  public constructor(light: Light) {
    this.light = light;
  }

  public execute(): void {
    this.light.off();
  }

  public undo(): void {
    this.light.on();
  }
}

// Concrete commands for AC ON and OFF
class AConCommand implements Command {
  private ac: AC;

  public constructor(ac: AC) {
    this.ac = ac;
  }

  public execute(): void {
    this.ac.on();
  }

  public undo(): void {
    this.ac.off();
  }
}

class ACOffCommand implements Command {
  private ac: AC;

  public constructor(ac: AC) {
    this.ac = ac;
  }

  public execute(): void {
    this.ac.off();
  }

  public undo(): void {
    this.ac.on();
  }
}

// ========== Remote control class (Invoker) ==========
class RemoteControl {
  private buttons: Command[] = new Array(4); // Assigning 4 slots for commands
  private commandHistory: Command[] = [];

  // Assign command to slot
  public setCommand(slot: number, command: Command): void {
    this.buttons[slot] = command;
  }

  // Press the button to execute the command
  public pressButton(slot: number): void {
    if (this.buttons[slot] != null) {
      this.buttons[slot].execute();
      this.commandHistory.push(this.buttons[slot]);
    } else {
      console.log("No command assigned to slot " + slot);
    }
  }

  // Undo the last action
  public pressUndo(): void {
    if (this.commandHistory.length > 0) {
      this.commandHistory.pop()?.undo();
    } else {
      console.log("No commands to undo.");
    }
  }
}

// ========= Client code ===========

function commandPattern() {
  const light = new Light();
  const ac = new AC();

  const lightOn = new LightOnCommand(light);
  const lightOff = new LightOffCommand(light);
  const acOn = new AConCommand(ac);
  const acOff = new ACOffCommand(ac);

  const remote = new RemoteControl();
  remote.setCommand(0, lightOn);
  remote.setCommand(1, lightOff);
  remote.setCommand(2, acOn);
  remote.setCommand(3, acOff);

  remote.pressButton(0); // Light ON
  remote.pressButton(2); // AC ON
  remote.pressButton(1); // Light OFF
  remote.pressUndo(); // Undo Light OFF -> Light ON
  remote.pressUndo(); // Undo AC ON -> AC OFF
}

commandPattern();
