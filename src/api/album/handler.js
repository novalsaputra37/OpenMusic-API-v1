const ClientError = require('../../exceptions/ClientError');

class AlbumsHandler {
    constructor(service, validator){
        this._service = service;
        this._validator = validator;

        this.PostAlbumsHandler = this.PostAlbumsHandler.bind(this);
        this.GetAlbumsHandler = this.GetAlbumsHandler.bind(this);
        this.GetAlbumByIdHandler = this.GetAlbumByIdHandler.bind(this);
        this.PutAlbumByIdHandler = this.PutAlbumByIdHandler.bind(this);
        this.DeleteAlbumByIdHandler = this.DeleteAlbumByIdHandler.bind(this);
    }

    // Add Data
    async PostAlbumsHandler(request, h) {
        try {
            this._validator.validateAlbumPayload(request.payload);
            const { name = 'unname', year } = request.payload;

            const albumId = await this._service.addAlbum({ name, year });

            const response = h.response({
                status: 'success',
                message: 'Album berhasil ditambahkan',
                data: {
                    albumId,
                },
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
    };

    // View all albums
    async GetAlbumsHandler() {
        const albums = await this._service.getAlbum();
        return{
            status: 'success',
            data : {
                albums: albums
            },
        }
    };

    // View Album by Id
    async GetAlbumByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const album = await this._service.getAlbumById(id);
            return {
                status: 'success',
                data: {
                    album,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
              const response = h.response({
                status: 'fail',
                message: error.message,
              });
              response.code(error.statusCode);
              return response;
            }
      
            // Server ERROR!
            const response = h.response({
              status: 'error',
              message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
          }
    };

    // Edit Album by Id
    async PutAlbumByIdHandler(request, h){
        try{
            this._validator.validateAlbumPayload(request.payload);
            const { id } = request.params;

            await this._service.putAlbumById(id, request.payload);

            return {
                status: 'success',
                message: 'Catatan berhasil diperbarui',
            };
            
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
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    };

    // Delete Album by Id
    async DeleteAlbumByIdHandler(request, h){
        try {
            const { id } = request.params;
            await this._service.daleteAlbumById(id);

            return {
                status: 'success',
                message: 'Catatan berhasil dihapus',
            };
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
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    };

};

module.exports = AlbumsHandler;