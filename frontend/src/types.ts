export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface SongStats {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: { _id: string; count: number }[];
  songsByArtist: { _id: string; songs: number; albums: string[] }[];
}
