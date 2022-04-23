const mapDBtoModel = ({
    id,
    name,
    year,
  }) => ({
    id,
    name,
    year,
  });
  
  const mapSongGetAll = ({
    id,
    title,
    performer,
  }) => ({
    id,
    title,
    performer,
  });
  
  const mapSongToModel =({
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
  })

  module.exports = { mapDBtoModel, mapSongToModel, mapSongGetAll };