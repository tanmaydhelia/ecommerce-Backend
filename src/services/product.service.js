const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
    let topLevel = await Category.findOne({name:reqData.topLavelCategory});
    if(!topLevel){
        topLevel = new Category({
            name:reqData.topLavelCategory,
            level:1
        })

        await topLevel.save();
    }

    let secondLevel = await Category.findOne({
        name:reqData.secondLavelCategory,
        parentCategory: topLevel._id,
    })

    if(!secondLevel){
        secondLevel = new Category({
            name:reqData.secondLavelCategory,
            parentCategory: topLevel._id,
            level: 2,
        })
        await secondLevel.save();
    }

    let thirdLevel = await Category.findOne({
        name:reqData.thirdLavelCategory,
        parentCategory: secondLevel._id,
    })

    if(!thirdLevel){
        thirdLevel = new Category({
            name:reqData.thirdLavelCategory,
            parentCategory: secondLevel._id,
            level: 3,
        })
        await thirdLevel.save();
    }

    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountPercent: reqData.discountPersent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.size,
        quantity: reqData.quantity,
        category: thirdLevel._id,
    })

    return await product.save();
}

async function deleteProduct(productId) {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return "Product Deleted Successfully";
}

async function updateProduct(productId, reqData){
    return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(id){
    const product = await Product.findById(id).populate("category").exec();

    if(!product){
        throw new Error("Product not found with ID: ", id);
    }

    return product;
}

async function getAllProducts(reqQuery){
    let {category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber,pageSize } = reqQuery;

    pageSize = pageSize || 10;
    pageNumber = pageNumber==0?1:pageNumber;

    let query = Product.find().populate("category");

    if(category){
        const existCategory = await Category.findOne({name:category});
        if(existCategory){
            query = query.where("category").equals(existCategory._id);
        }
        else{
            return {content:[], currentPage:1, totalPages:0};
        }
    }
//white,black,orange => [white, black, orange] 
    if(color){
        const colorSet = new Set(color.split(",").map(color=>color.trim().toLowerCase()));

        const colorRegex = colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null;

        query = query.where("color").regex(colorRegex);
    }

    if(sizes){
        const sizesSet = new Set(sizes);

        query=query.where("sizes.name").in([...sizesSet]);
    }

    if(minPrice && maxPrice){
        query = query.where('discountedPrice').gte(minPrice).lte(maxPrice);
    }
    if(minDiscount){
        query = query.where("discountedPrice").gt(minDiscount);
    }

    if(stock){
        if(stock==="in_stock"){
            query = query.where("quantity").gt(0);
        }
        else if(stock==="out_of_stock"){
            query = query.where("quantity").lte(1);
        }
    }

    if(sort){
        const sortDirection = sort==="price_hieght"?-1:1;
        query=query.sort({discountedPrice: sortDirection})
    }

    const totalProducts = await Product.countDocuments(query);

    const skip = (pageNumber - 1)* pageSize;

    query = query.skip(skip).limit(pageSize);
    // console.log("HERE");

    const products = await query.exec();

    const totalPages = Math.ceil(totalProducts/pageSize);

    return {content: products, currentPage: pageNumber, totalPages,}
}

async function deleteAllProducts() {
    await Product.deleteMany({});
    return "All products deleted successfully";
}

async function createMultipleProduct(products) {
    for(let product of products){
        await createProduct(product);
    }
}

module.exports ={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct,
    deleteAllProducts,
}


