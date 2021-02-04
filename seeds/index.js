const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelpCamp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("mongo connection open!");
    })
    .catch(err => {
        console.log(err);
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error!'));
db.once('open', () => {
    console.log('Database connected!');
})


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        let random1000 = Math.floor(Math.random() * 1000);
        let camp = new Campground({
            name: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${places[Math.floor(Math.random() * places.length)]}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat odio nihil sunt quisquam blanditiis vel quia earum et delectus, impedit ipsam, odit aut amet suscipit ut iusto assumenda natus eligendi.',
            price: (Math.floor(Math.random() * 20) + 0.99),
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            author: '60184cc8e4b0e47b2d0b0c1c',
            images:
            {
                url: 'https://res.cloudinary.com/dqgp6kbib/image/upload/v1612304816/YelpCamp/zztweohc5gd2wp975uhb.jpg',
                filename: 'YelpCamp/zztweohc5gd2wp975uhb'
            }
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});