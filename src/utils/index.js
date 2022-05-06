const mapDBtoModel = ({ id, name, year, cover }) => ({
  id,
  name,
  year,
  coverUrl: cover,
});

const mapSongGetAll = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

const mapSongToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
});

const PlaylistMapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  inserted_at,
  updated_at,
  username,
  name,
  owner,
  playlist_id,
  song_id,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: inserted_at,
  updatedAt: updated_at,
  username,
  name,
  owner,
  playlistId: playlist_id,
  songId: song_id,
});

module.exports = {
  mapDBtoModel,
  mapSongToModel,
  mapSongGetAll,
  PlaylistMapDBToModel,
};
