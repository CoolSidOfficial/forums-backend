import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    asin: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    title: String,
    description: String,

    image: String,
    images: [String],

    price: Number,
    currency: String,

    availability: String,
    country: String,

    platform: String,
    originalUrl: String,

    productInfo: [mongoose.Schema.Types.Mixed],
    productDetails: [mongoose.Schema.Types.Mixed],
    productVideos: [mongoose.Schema.Types.Mixed],
    productVariations: [mongoose.Schema.Types.Mixed],
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);