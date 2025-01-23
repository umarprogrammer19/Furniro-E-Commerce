import { defineType } from "sanity"

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            validation: (rule) => rule.required(),
            type: "string"
        },
        {
            name: "description",
            type: "text",
            validation: (rule) => rule.required(),
            title: "Description",
        },
        {
            name: "imageUrl",
            type: "image",
            validation: (rule) => rule.required(),
            title: "Product Image"
        },
        {
            name: "price",
            type: "number",
            validation: (rule) => rule.required(),
            title: "Price",
        },
        {
            name: "tags",
            type: "array",
            title: "Tags",
            of: [{ type: "string" }]
        },
        {
            name: "dicountPercentage",
            type: "number",
            title: "Discount Percentage",
        },
        {
            name: "isNew",
            type: "boolean",
            title: "New Badge",
        }, {
            name: "category",
            type: "string",
            title: "Category",
            validation: (rule) => rule.required(),
            options: {
                list: [
                    { title: "Chair", value: "chair" },
                    { title: "Sofa", value: "sofa" },
                    { title: "Light", value: "light" },
                    { title: "Bed", value: "bed" },
                    { title: "Table", value: "table" },
                    { title: "Items", value: "items" }
                ],
            },
        }
    ]
})