import { Song } from "../models/song.js";

// Create Song
export const createSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Songs
export const getSongs = async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
};

// Update Song
export const updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Song
export const deleteSong = async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.json({ message: "Song deleted" });
};

// Stats
export const getStats = async (req, res) => {
  const totalSongs = await Song.countDocuments();
  const totalArtists = await Song.distinct("artist");
  const totalAlbums = await Song.distinct("album");
  const totalGenres = await Song.distinct("genre");

  const songsByGenre = await Song.aggregate([
    { $group: { _id: "$genre", count: { $sum: 1 } } },
  ]);

  const songsByArtist = await Song.aggregate([
    {
      $group: {
        _id: "$artist",
        songs: { $sum: 1 },
        albums: { $addToSet: "$album" },
      },
    },
  ]);

  res.json({
    totalSongs,
    totalArtists: totalArtists.length,
    totalAlbums: totalAlbums.length,
    totalGenres: totalGenres.length,
    songsByGenre,
    songsByArtist,
  });
};
