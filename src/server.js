require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/album');
const songs = require('./api/song')
const AlbumsService = require('./services/postgres/albumService');
const SongsService = require('./services/postgres/songService');
const albumsValidator = require('./validator/albums');
const songsValidator = require('./validator/songs')

const init = async () => {
    const albumsService = new AlbumsService();
    const songsService = new SongsService();
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    const ListPlugins = [
        {
            plugin: albums,
            options: {
                service: albumsService,
                validator: albumsValidator,
            }
        },
        {
            plugin: songs,
            options: {
                service: songsService,
                validator: songsValidator
            }
        }
    ]

    await server.register( ListPlugins);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();