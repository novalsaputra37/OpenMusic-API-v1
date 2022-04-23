const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
    constructor(service, validator){
        this._service = service;
        this._validator = validator;

        this.PostSongHandler = this.PostSongHandler.bind(this);
        this.GetSongsHandler = this.GetSongsHandler.bind(this);
        this.GetSongByIdHandler = this.GetSongByIdHandler.bind(this);
        this.PutSongByIdHandler = this.PutSongByIdHandler.bind(this);
        this.DeleteSongByIdHandler = this.DeleteSongByIdHandler.bind(this);
    }

    // add song
    async PostSongHandler(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);
            const { title = 'untitled', year, genre, performer, duration, albumId} = request.payload;
            const songId = await this._service.addSong({ title, year, genre, performer, duration , albumId });

            const response = h.response({
                status: 'success',
                massage: 'Song berhasil ditambahkan',
                data: {
                    songId,
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

    // View All Song
    async GetSongsHandler() {
        const songs = await this._service.getSongs();
        return{
            status: 'success',
            data : {
                songs: songs
            },
        }
    };
    
    // view Song By id
    async GetSongByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const song = await this._service.getSongById(id);
            return {
                status: 'success',
                data: {
                    song,
                }
            }
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

    // Edit Song By Id
    async PutSongByIdHandler(request, h) {
        try{
            this._validator.validateSongPayload(request.payload);
            const { id } = request.params;

            await this._service.putSongByid(id, request.payload);

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

    async DeleteSongByIdHandler(request, h){
        try {
            const { id } = request.params;
            await this._service.deleteSongById(id);

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

module.exports = SongsHandler;