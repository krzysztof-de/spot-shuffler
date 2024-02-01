"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var placeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter place name"],
        trim: true,
        maxLength: [200, "Place name cannot exceed 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Please enter place description"],
    },
    pageLink: {
        type: String,
        required: [false, "Please enter place url link"],
    },
    address: {
        type: String,
        required: [false, "Please enter place url link"],
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
        },
        formattedAddress: String,
        city: String,
        zipCode: String,
        country: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Pleace enter place category"],
        enum: {
            value: "Przyroda",
            message: "Please select correct category for place",
        },
    },
    reviews: [
        {
            user: {
                type: mongoose_1.Types.ObjectId,
                ref: "User",
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.models.Place || (0, mongoose_1.model)("Place", placeSchema);
