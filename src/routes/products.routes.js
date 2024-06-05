import { Router } from "express";
import dotenv from "dotenv";
import { 
    getProducts,
    postProducts,
    getProductsByTag,
    getProductsByTitle, 
    deleteProduct,
    getProductById,
    updateProduct,
    getCount,
    getFeaturedProducts
} from "../controllers/products.controllers.js";

dotenv.config()


const api_url = process.env.api_url

const router = Router()

router.get(`${api_url}/products`, getProducts)
router.get(`${api_url}/products/id::id`, getProductById)
router.get(`${api_url}/products/tag::tag`, getProductsByTag)
router.get(`${api_url}/products/title::title`, getProductsByTitle)
router.get(`${api_url}/products/get/count`, getCount)
router.get(`${api_url}/products/get/featured/`, getFeaturedProducts)

router.delete(`${api_url}/products/id::id`, deleteProduct)

router.post(`${api_url}/products`, postProducts)

router.patch(`${api_url}/products/id::id`, updateProduct)

export default router