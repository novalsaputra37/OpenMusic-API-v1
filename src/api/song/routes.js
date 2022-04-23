const routes = (handler) => [
    {
        method: 'POST',
        path: '/songs',
        handler: handler.PostSongHandler 
    },
    {
        method: 'GET',
        path: '/songs',
        handler: handler.GetSongsHandler
    },
    {
        method: 'GET',
        path: '/songs/{id}',
        handler: handler.GetSongByIdHandler
    },
    {
        method: 'PUT',
        path: '/songs/{id}',
        handler: handler.PutSongByIdHandler
    },
    {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: handler.DeleteSongByIdHandler
    },
]

module.exports = routes;