import axios from "axios";
import { Product } from "../models/Product.js";

function extractASIN(url) {
  const match = url.match(
    /(?:dp|gp\/product|product)\/([A-Z0-9]{10})/i
  );

  return match ? match[1].toUpperCase() : null;
}

export const createProductDiscussion = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: "Product URL is required",
      });
    }

    const asin = extractASIN(url);

    if (!asin) {
      return res.status(400).json({
        message: "Invalid Amazon product URL",
      });
    }

    // Check if product discussion already exists
    let product = await Product.findOne({ asin });

    if (product) {
      return res.status(200).json({
        exists: true,
        slug: product.slug,
        product,
      });
    }

    // Fetch product details from RapidAPI
    const response = await axios.get(
      "https://amazon-online-data-api.p.rapidapi.com/product",
      {
        params: {
          asins: asin,
          geo: "IN",
        },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": "amazon-online-data-api.p.rapidapi.com",
        },
      }
    );

    const results = response.data.results || [];

    if (results.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const data = results[0];

    // Get first image safely
    let image = "";

    if (Array.isArray(data.product_images) && data.product_images.length > 0) {
      const firstImage = data.product_images[0];

      if (typeof firstImage === "string") {
        image = firstImage;
      } else {
        image =
          firstImage.link ||
          firstImage.large ||
          firstImage.hi_res ||
          firstImage.image ||
          "";
      }
    }

    // Create new discussion
    product = await Product.create({
      asin,
      slug: asin.toLowerCase(),

      title: data.title || "Unknown Product",

      description: data.description || "",

      image,
      images: data.product_images || [],

      price: Number(data.price) || 0,

      currency: data.currency || "INR",

      availability:
        typeof data.availability === "object"
          ? data.availability?.message || ""
          : data.availability || "",

      availabilityType:
        typeof data.availability === "object"
          ? data.availability?.type || ""
          : "",

      country: data.country || "IN",

      platform: "amazon.in",

      originalUrl: url,

      productInfo: data.product_info || [],

      productDetails: data.product_details || [],

      productVideos: data.product_videos || [],

      productVariations: data.product_variations || [],
    });

    return res.status(201).json({
      exists: false,
      slug: product.slug,
      product,
    });
  } catch (error) {
    console.error("RapidAPI Error:");
    console.error(error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      message: error.response?.data || error.message,
    });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};