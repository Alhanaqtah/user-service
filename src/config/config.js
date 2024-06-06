export let config = {
    port: process.env.PORT || 5000,
    storagePath: process.env.STORAGE_PATH || './storage/storage.db',
    jwt: {
        secret: process.env.JWT_SECRET || 'so-secret-word',
        expiration: process.env.JWT_EXPIRATION * 1000 * 60 || 15 * 1000 * 60,
    }
}