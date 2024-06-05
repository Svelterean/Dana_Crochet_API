import { Product } from "../models/products.models.js"

export const getProducts = async(req, res) => {
    
    try {
        const productList = await Product.find()

        if(!productList) {
            res.status(500).json({success: false})
        }

        res.send(productList)
    }
    
    catch (error) {
        res.send(error)
    }
}

export const getProductById = async(req, res) => {
    try {
        const productId = req.params.id
        const productList = await Product.find()

        const foundedProduct = productList.find(product => product.id == productId) 

        if(!productList) {
            res.status(500).json({success: false})
        }

        res.send(foundedProduct)
    }
    
    catch (error) {
        res.send(error)
    }
}

export const getProductsByTag = async(req, res) => {
    try {
        const productList = await Product.find()
        const filteredProducts = productList.filter(product => product.tags.includes(req.params.tag))

        res.send(filteredProducts)
    } catch (error) {
        res.send(error)
    }
}

export const getProductsByTitle = async(req, res) => {
    try {
        const productList = await Product.find()
        const title = await req.params.title
        const productSearched = productList.find(product => product.title.includes(title))

        if (!productSearched) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.send(productSearched)

    } catch (error) {
        res.send(error)
    }
}

export const deleteProduct = async(req, res) => {
    try {
        Product.findByIdAndDelete(req.params.id)
        .then(product => {
            if(product) {
                return res.status(200).json({success: true, message: "product deleted"})
            }
            else {
                return res.status(404).json({success: false, message: "product not found"})
            }
        }).catch(err => {
            return res.status(400).json({success: false, message: err})
        })
    }
    catch (error) {
        res.send(error)
    }
}

export const postProducts = async(req, res) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        size: req.body.size,

        tags: req.body.tags,

        price: req.body.price,
        countInStock: req.body.countInStock,
        dateCreated: req.body.dateCreated,
        isFeatured: req.body.isFeatured,
    })

    product.save()
    .then(createdProduct => {
        res.status(201).json(createdProduct)
    })
    .catch((err) => {
        res.status(500).json(err)
    })

}

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, // ID del producto a actualizar
            {
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                size: req.body.size,
                tags: req.body.tags,
                price: req.body.price,
                countInStock: req.body.countInStock,
                dateCreated: req.body.dateCreated, 
                isFeatured: req.body.isFeatured,
            },
            { new: true, useFindAndModify: false } // Opciones para devolver el documento actualizado y usar la versión más reciente de MongoDB
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send("Error al actualizar el producto");
    }
};

export const getCount = async (req, res) => {
    const productCount = await Product.countDocuments()

    if(!productCount){
        res.status(500).json({success: false})
    }

    res.send({
        count: productCount
    })
}

export const getFeaturedProducts = async (req, res) => {
    try {
        const productList = await Product.find()
        const featuredProducts = productList.filter(product => product.isFeatured == true)
    
        if (!featuredProducts) {
            res.status(500).json({success: false})
        }

        res.send(featuredProducts)
    } catch (error) {
        res.send(error)
    }
}