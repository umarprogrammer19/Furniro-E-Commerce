import { client } from "@/sanity/lib/client";

export const fetchData = async (): Promise<void> => {
    
    try {
        const res = await fetch("https://template6-six.vercel.app/api/products");

        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.statusText}`);
        }

        const products = await res.json();

        for (const {
            title,
            imageUrl,
            price,
            tags,
            description,
            dicountPercentage,
            isNew,
        } of products) {
            try {
                const imageAsset = await upload(imageUrl);

                if (!imageAsset) {
                    console.warn(`Failed to upload image for product: ${title}`);
                    continue;
                }

                await client.create({
                    _type: "product",
                    title,
                    description,
                    price,
                    tags,
                    dicountPercentage,
                    imageUrl: {
                        _type: "image",
                        asset: {
                            _type: "reference",
                            _ref: imageAsset._id,
                        },
                    },
                    isNew,
                });

                console.log("Migrated Product:", title);
            } catch (err) {
                if (err)
                    console.error(`Failed to migrate product: ${title}`);
            }
        }
    } catch (error) {
        console.error("Error in fetchData:", error);
    }
};

const upload = async (image: string): Promise<any | null> => {
    try {
        const res = await fetch(image);

        if (!res.ok) {
            console.warn(`Failed to fetch image: ${image}`);
            return null;
        }

        const contentType = res.headers.get("content-type") || "image/jpeg";

        const imageAsset = await client.assets.upload("image", await res.blob(), {
            filename: image.split("/").pop() || "image",
            contentType,
        });

        return imageAsset;
    } catch (error) {
        console.error("Error in upload:", error);
        return null;
    }
};

fetchData();