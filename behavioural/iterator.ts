/*
======= Iterator Pattern =======
The Iterator Pattern is a behavioral design pattern 
that provides a way to access the elements of a collection sequentially 
without exposing the underlying representation.

======= Formal Definition =======
The Iterator Pattern is a behavioral design pattern 
that entrusts the traversal behavior of a collection to a separate design object. 
It traverses the elements without exposing the underlying operations.

This means whether your collection is an array, a list, a tree, or something custom, 
you can use an iterator to traverse it in a consistent manner, 
one element at a time, without worrying about how the data is stored or managed internally.
*/

// ========== Video class representing a single video ==========
class Video {
  public title: string;
  public duration: number;

  constructor(title: string, duration: number) {
    this.title = title;
    this.duration = duration;
  }

  getTitle(): string {
    return this.title;
  }

  getDuration(): number {
    return this.duration;
  }
}

// ========== YouTubePlaylist class (Aggregate) ==========
class YouTubePlaylist {
  private videos: Video[] = [];

  // Method to add video to playlist
  public addVideo(video: Video): void {
    this.videos.push(video);
  }

  // Method to expose internal video list
  public getVideos(): Video[] {
    return this.videos;
  }
}

// ========== Iterator interface ==========
interface PlaylistIterator {
  hasNext(): boolean;
  next(): Video | null;
}

// ========== Concrete Iterator class ==========
class YouTubePlaylistIterator implements PlaylistIterator {
  private videos: Video[];
  private position: number;

  // Constructor takes the list to iterate on
  public constructor(videos: Video[]) {
    this.videos = videos;
    this.position = 0;
  }

  // Check if more videos are left to iterate
  public hasNext(): boolean {
    return this.position < this.videos.length;
  }

  // Return the next video in sequence
  public next(): Video | null {
    return this.hasNext() ? this.videos[this.position++] : null;
  }
}

// ========== Main method (Client code) ==========
function iterator() {
  // Create a playlist and add videos
  const playlist = new YouTubePlaylist();
  playlist.addVideo(new Video("LLD Tutorial", 10));
  playlist.addVideo(new Video("System Design Basics", 20));

  // Client directly creates the iterator using internal list (not ideal)
  const iterator = new YouTubePlaylistIterator(playlist.getVideos());

  // Use the iterator to loop through the playlist
  while (iterator.hasNext()) {
    const video = iterator.next();
    if (video) {
      console.log(
        video.getTitle() +
          " video has duration of " +
          video.getDuration() +
          " mins",
      );
    }
  }
}

iterator();
