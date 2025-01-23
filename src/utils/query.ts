export const query = `*[_type == "product"]{
    _id,
    title,
    "imageUrl": imageUrl.asset->url,
    price,
    category,
    tags,
    description,
    dicountPercentage,
    isNew,  
}`