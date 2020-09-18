module.exports = {
	port: process.env.PORT || 3000,
	db: process.env.MONGODB_URI || 'mongodb://localhost:27017/hospital',
	seed: process.env.SEED || 'mi-semilla-seed-secreto-desarrollo',
	expiracion_token: process.env.EXPIRACION_TOKEN || '30d',
	max_size_file: process.env.MAX_SIZE_FILE || '52428800'
}