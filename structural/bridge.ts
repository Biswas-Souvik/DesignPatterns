// ======== Implementor Interface =========
interface VideoQuality {
  load(title: string): void;
}

// ======== Concrete Implementors =========
class SDQuality implements VideoQuality {
  load(title: string): void {
    console.log("\tStreaming " + title + " in SD Quality");
  }
}

class HDQuality implements VideoQuality {
  load(title: string): void {
    console.log("\tStreaming " + title + " in HD Quality");
  }
}

// ======== Abstraction =========
abstract class VideoPlayer {
  protected videoQuality: VideoQuality;

  constructor(videoQuality: VideoQuality) {
    this.videoQuality = videoQuality;
  }

  abstract play(title: string): void;
}

// ======== Refined Abstraction =========
class WebPlayer extends VideoPlayer {
  constructor(videoQuality: VideoQuality) {
    super(videoQuality);
  }

  play(title: string): void {
    console.log("Web Platform: ");
    this.videoQuality.load(title);
  }
}

class MobilePlayer extends VideoPlayer {
  constructor(videoQuality: VideoQuality) {
    super(videoQuality);
  }

  play(title: string): void {
    console.log("Mobile Platform: ");
    this.videoQuality.load(title);
  }
}

// ======== Client Code =========
function bridge() {
  const player1: VideoPlayer = new WebPlayer(new HDQuality());
  player1.play("Interstellar");

  const player2: VideoPlayer = new MobilePlayer(new SDQuality());
  player2.play("Inception");
}

bridge();
