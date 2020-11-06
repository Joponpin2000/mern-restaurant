module.exports = {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/todos',
    JWT_SECRET: process.env.JWT_SECRET || 'ghddrrvhjjibytderwesxlkjiyuyrweqdafzcvxvnbkop',
    JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',
    SECRET_KEY: process.env.SECRET_KEY || 'sk_test_dca2a0d8142d174620a38e6e49697b1686b0fbc5',
}