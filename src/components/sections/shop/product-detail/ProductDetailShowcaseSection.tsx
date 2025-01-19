'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAtom } from 'jotai'
import { MinusIcon, PlusIcon, StarIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cartAtom } from '@/lib/storage/jotai'
import { client } from '@/sanity/lib/client'
import { ImportedData } from '@/types'

const MAX_QUANTITY = 5

export default function ProductDetailShowcaseSection({
  productId,
}: {
  productId: string
}) {
  const [quantity, setQuantity] = useState(1)
  const [specificProduct, setSpecificProduct] = useState<ImportedData | null>(null)
  const [cart, setCart] = useAtom(cartAtom);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDataFromSanity = async () => {
      try {
        const query = `*[_type == "product" && _id == $productId][0]{
          _id,
          title,
          "imageUrl": imageUrl.asset->url,
          price,
          tags,
          description,
          discountPercentage,
          isNew
        }`
        const product = await client.fetch(query, { productId })
        setSpecificProduct(product)
      } catch (error) {
        console.error('Error fetching data from Sanity:', error)
        toast({
          title: 'Error',
          description: 'Failed to load product details. Please try again.',
          variant: 'destructive',
        })
      }
    }
    fetchDataFromSanity()
  }, [productId, toast])

  const handleQuantityChange = (increment: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + increment, MAX_QUANTITY)))
  }

  const handleAddToCart = () => {
    if (!specificProduct) return

    const productObject = {
      _id: specificProduct._id,
      imageUrl: specificProduct.imageUrl,
      title: specificProduct.title,
      quantity,
      price: Number(specificProduct.price),
    }

    setCart((prev) => {
      const existingProductIndex = prev.findIndex((item: { _id: string }) => item._id === productObject._id)
      if (existingProductIndex !== -1) {
        const updatedCart = [...prev]
        updatedCart[existingProductIndex] = productObject
        return updatedCart
      }
      return [...prev, productObject]
    })

    toast({
      title: 'Added to Cart!',
      description: `${specificProduct.title} added to your cart.`,
    });

    console.log(cart);
  }

  if (!specificProduct) {
    return <div className="flex justify-center items-center h-96">Loading product details...</div>
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="flex gap-6">
          {/* Thumbnails */}
          <div className="hidden lg:flex flex-col gap-4">
            {[...Array(4)].map((_, index) => (
              <button
                key={index}
                className="aspect-square overflow-hidden rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <Image
                  src={specificProduct.imageUrl || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 flex-1">
            <Image
              src={specificProduct.imageUrl || "/placeholder.svg"}
              alt={specificProduct.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>


        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{specificProduct.title}</h1>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              $ {Number(specificProduct.price).toLocaleString()}
            </p>
          </div>

          {/* Reviews */}
          <div className="flex items-center space-x-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <Separator orientation="vertical" className="h-5" />
            <p className="text-sm text-gray-600">5 Customer Reviews</p>
          </div>

          {/* Product Description */}
          <p className="text-gray-700 leading-relaxed">{specificProduct.description.slice(0, 380)}...</p>

          {/* Quantity Selector and Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="text-gray-600 hover:text-gray-900"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="mx-3 text-lg font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= MAX_QUANTITY}
                className="text-gray-600 hover:text-gray-900"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddToCart} className="flex-1">
              Add to Cart
            </Button>
          </div>

          <Separator className="my-6" />

          {/* Additional Details */}
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="text-gray-500 font-medium w-24">Category:</span>
              <span className="text-gray-900">Sofas</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 font-medium w-24">Tags:</span>
              <span className="text-gray-900">{specificProduct.tags.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

