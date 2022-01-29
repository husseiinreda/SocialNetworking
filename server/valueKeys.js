const config = require('config');
module.exports = {
    MongoURI:`mongodb+srv://xiaodi:${config.get('dbpass')}@cluster0.w0w8h.mongodb.net/SocialNetworking?retryWrites=true&w=majority`
}