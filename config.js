module.exports = {
    ENV : process.env.NODE_ENV || 'development',
    PORT :process.env.PORT  || 3000,
    URL : process.env.BASE_URL || 'http://localhost:3000',
    //MONGODB_URI : process.env.MONGODB_URI || 'mongodb://admin!:admin123!@ds159263.mlab.com:59263/customer_api'
    MONGODB_URI : process.env.MONGODB_URI ||'mongodb://admin:admin123@ds159263.mlab.com:59263/customer_api'
 
}