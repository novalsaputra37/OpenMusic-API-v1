const ClientError = require('../../exceptions/ClientError');

class UserAlbumLikesHandler {
  constructor(userAlbumLikeService, albumsService) {
    this._userAlbumLikeService = userAlbumLikeService;
    this._albumsService = albumsService;

    this.postUserAlbumLikeHandler = this.postUserAlbumLikeHandler.bind(this);
    this.getUserAlbumLikeByAlbumIdHandler =
      this.getUserAlbumLikeByAlbumIdHandler.bind(this);
  }

  async postUserAlbumLikeHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._albumsService.verifyExistingAlbumById(id);

      const isLiked = await this._userAlbumLikeService.verifyUserAlbumLike(
        credentialId,
        id
      );

      if (!isLiked) {
        await this._userAlbumLikeService.addUserAlbumLikes(credentialId, id);

        const response = h.response({
          status: 'success',
          message: 'Album berhasil disukai',
        });

        response.code(201);

        return response;
      }

      await this._userAlbumLikeService.deleteUserAlbumLikes(credentialId, id);

      const response = h.response({
        status: 'success',
        message: 'Batal menyukai album berhasil',
      });

      response.code(201);

      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      //server error
      const response = h.response({
        status: 'error',
        message: 'Maaaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getUserAlbumLikeByAlbumIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { number, source } =
        await this._userAlbumLikeService.getUserAlbumLikeByAlbumId(id);

      const response = h.response({
        status: 'success',
        data: {
          likes: number,
        },
      });

      response.header('X-Data-Source', source);

      response.code(200);

      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      //server error
      const response = h.response({
        status: 'error',
        message: 'Maaaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = UserAlbumLikesHandler;
