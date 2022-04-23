const InvariantError = require('../../exceptions/InvariantError');
const SongPayloadSchema = require('./schema')

const SongValidator = {
    validateSongPayload: (payload) => {
        const vlidationResult = SongPayloadSchema.validate(payload)
        if(vlidationResult.error){
            throw new InvariantError(vlidationResult.error.message)
        }
    },
};

module.exports = SongValidator