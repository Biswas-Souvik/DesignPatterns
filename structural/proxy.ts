interface VideoDownloader {
  downloadVideo(videoUrl: string): string;
}

// ========== RealVideoDownloader Class ==========
class RealVideoDownloader implements VideoDownloader {
  downloadVideo(videoUrl: string): string {
    console.log("Downloading video from URL: " + videoUrl);
    return "Video content from " + videoUrl;
  }
}

// =============== Proxy With Cache ====================
class CachedVideoDownloader implements VideoDownloader {
  private realVideoDownloader: RealVideoDownloader;
  private cache: Map<string, string>;

  constructor() {
    this.realVideoDownloader = new RealVideoDownloader();
    this.cache = new Map<string, string>();
  }

  downloadVideo(videoUrl: string): string {
    if (this.cache.has(videoUrl)) {
      console.log("Returning cached video for: " + videoUrl);
      return this.cache.get(videoUrl)!;
    }

    console.log("Cache miss. Downloading...");
    const video = this.realVideoDownloader.downloadVideo(videoUrl);
    this.cache.set(videoUrl, video);
    return video;
  }
}

// =============== Client Code ====================
function proxy() {
  const cacheVideoDownloader: VideoDownloader = new CachedVideoDownloader();
  console.log("User 1 tries to download the video.");
  cacheVideoDownloader.downloadVideo("https://video.com/proxy-pattern");

  console.log();

  console.log("User 2 tries to download the same video again.");
  cacheVideoDownloader.downloadVideo("https://video.com/proxy-pattern");
}

proxy();
