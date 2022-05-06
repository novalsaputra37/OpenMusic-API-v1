const UserAlbumLikesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'useralbumlikes',
  version: '1.0.0',
  register: async (
    server,
    { userAlbumLikeService, albumsService, validator }
  ) => {
    const userAlbumLikesHandler = new UserAlbumLikesHandler(
      userAlbumLikeService,
      albumsService,
      validator
    );

    server.route(routes(userAlbumLikesHandler));
  },
};
