const routes = (handler) => [
    {
        method: 'POST',
        path: '/albums',
        handler: handler.PostAlbumsHandler
    },
    {
        method: 'GET',
        path: '/albums',
        handler: handler.GetAlbumsHandler
    },
    {
        method: 'GET',
        path: '/albums/{id}',
        handler: handler.GetAlbumByIdHandler,
    },
    {
        method: 'PUT',
        path: '/albums/{id}',
        handler: handler.PutAlbumByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: handler.DeleteAlbumByIdHandler,
    }
]

module.exports = routes;