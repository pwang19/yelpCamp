const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require('./review');
const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_300');
})

const campgroundSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: [ImageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts);

campgroundSchema.virtual('properties.popupMarkup').get(function () {
    // return `<h3><a href="/campgrounds/${this._id}">hi ${this.name}</a></h3>`;
    return `${this.name} at ${this.location}; ${this.description.substring(0, 20)}`;
})

campgroundSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    };
});

module.exports = mongoose.model('Campground', campgroundSchema);