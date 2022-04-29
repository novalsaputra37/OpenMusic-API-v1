/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.sql("INSERT INTO albums(id, name, year) VALUES ('old_songs', 'old_songs', 2022)");
    pgm.sql('UPDATE songs SET "albumId" = \'old_songs\' WHERE "albumId" = NULL');
    pgm.addConstraint('songs', 'fk_songs.albumId_songs.id', 'FOREIGN KEY("albumId") REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropConstraint("songs", "fk_songs.albumId_songs.id");
    pgm.sql("UPDATE songs SET 'albumId' = NULL WHERE 'albumId' = 'old_songs'");
    pgm.sql("DELETE FROM albums WHERE id = 'old_songs'");
};