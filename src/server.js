require('dotenv').config();

//hapi
const Hapi = require('@hapi/hapi');
const Jwt = require("@hapi/jwt");
// const Inert = require('@hapi/inert');

// Album
const albums = require('./api/album');
const AlbumsService = require('./services/postgres/albumService');
const albumsValidator = require('./validator/albums');

// Song
const songs = require('./api/song');
const songsValidator = require('./validator/songs');
const SongsService = require('./services/postgres/songService');

// User
const users = require('./api/user');
const UserService = require('./services/postgres/userService');
const UsersValidator = require('./validator/users');

// Authentications
const authentications = require('./api/authentication');
const AuthenticationService = require('./services/postgres/authenticationsService');
const TokenManager = require("./tokenize/TokenManager");
const AuthenticationsValidator = require("./validator/authentications");

// Playlist
const playlists = require("./api/playlist");
const PlaylistsService = require("./services/postgres/PlaylistsService");
const PlaylistsValidator = require("./validator/playlists");

//collaborations
const collaborations = require("./api/collaboration");
const CollaborationsService = require("./services/postgres/collaborationsService");
const CollaborationsValidator = require("./validator/collaborations");

// playlistsongs
const playlistsongs = require("./api/playlistsong");
const PlaylistsongsService = require("./services/postgres/PlaylistsongsService");
const PlaylistsongsValidator = require("./validator/playlistsongs");

//RabitMQ
const _exports = require('./api/exports');
const ProducerService = require('./services/rabbitmq/ProducerService');
const ExportsValidator = require('./validator/exports');

const init = async () => {
    const albumsService = new AlbumsService();
    const songsService = new SongsService();
    const userService = new UserService();
    const authenticationService = new AuthenticationService();
    const playlistsService = new PlaylistsService();
    const collaborationsService = new CollaborationsService();
    const playlistsongsService = new PlaylistsongsService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

      // registrasi plugin eksternal
    await server.register([
        {
        plugin: Jwt,
        },
        // {
        // plugin: Inert,
        // },
    ]);

    server.auth.strategy("playlistsapp_jwt", "jwt", {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
          aud: false,
          iss: false,
          sub: false,
          maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
          isValid: true,
          credentials: {
            id: artifacts.decoded.payload.id,
          },
        }),
      });

    await server.register([
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
        },
        {
            plugin: users,
            options: {
                service: userService,
                validator: UsersValidator
            }
        },
        {
            plugin: authentications,
            options: {
                authenticationService,
                userService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator
            }
        },
        {
            plugin: collaborations,
            options: {
                collaborationsService,
                userService,
                validator: CollaborationsValidator
            }
        },
        {
            plugin: playlists,
            options: {
                playlistsService,
                userService,
                validator: PlaylistsValidator
            }
        },
        {
            plugin: playlistsongs,
            options: {
                playlistsongsService,
                playlistsService,
                songsService,
                validator: PlaylistsongsValidator
            }
        },
        {
            plugin: _exports,
            options: {
                service: ProducerService,
                validator: ExportsValidator,
                playlistsService,
            },
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();