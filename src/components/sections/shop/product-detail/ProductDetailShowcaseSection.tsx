'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAtom } from 'jotai'
import { MinusIcon, PlusIcon, StarIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cartAtom } from '@/lib/storage/jotai'
import Loading from '@/components/common/loading'
import { getSingleProduct, ProductFromAPI } from '@/lib/api/products'

export default function ProductDetailShowcaseSection({
  productId,
}: {
  productId: string
}) {
  const [quantity, setQuantity] = useState(1)
  const [specificProduct, setSpecificProduct] = useState<ProductFromAPI | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cart, setCart] = useAtom(cartAtom)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const product = await getSingleProduct(productId)
        setSpecificProduct(product)
      } catch (error) {
        console.error('Error fetching product:', error)
        toast({
          title: 'Error',
          description: 'Failed to load product details. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct()
  }, [productId, toast])

  const handleQuantityChange = (increment: number) => {
    if (!specificProduct) return

    const newQuantity = quantity + increment
    if (newQuantity < 1) {
      setQuantity(1)
    } else if (newQuantity > specificProduct.stock) {
      toast({
        title: 'Maximum Stock Reached',
        description: `Only ${specificProduct.stock} items available in stock.`,
        variant: 'destructive',
      })
    } else {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (!specificProduct) return

    // Check if product is out of stock
    if (specificProduct.stock === 0) {
      toast({
        title: 'Out of Stock',
        description: 'This product is currently out of stock.',
        variant: 'destructive',
      })
      return
    }

    // Check if adding quantity would exceed stock
    const existingCartItem = cart.find((item) => item._id === specificProduct._id)
    const currentQuantityInCart = existingCartItem?.quantity || 0
    const totalQuantityAfterAdd = currentQuantityInCart + quantity

    if (totalQuantityAfterAdd > specificProduct.stock) {
      toast({
        title: 'Stock Limit Exceeded',
        description: `You already have ${currentQuantityInCart} in cart. Only ${specificProduct.stock} items available in stock.`,
        variant: 'destructive',
      })
      return
    }

    const productObject = {
      _id: specificProduct._id,
      imageUrl: specificProduct.imageUrl,
      title: specificProduct.title,
      quantity: totalQuantityAfterAdd,
      price: Number(specificProduct.price),
      stock: specificProduct.stock, // Track stock in cart
    }

    setCart((prev) => {
      const existingProductIndex = prev.findIndex((item) => item._id === productObject._id)
      if (existingProductIndex !== -1) {
        const updatedCart = [...prev]
        updatedCart[existingProductIndex] = productObject
        return updatedCart
      }
      return [...prev, productObject]
    })

    toast({
      title: 'Added to Cart!',
      description: `${specificProduct.title} (${quantity} item${quantity > 1 ? 's' : ''}) added to your cart.`,
    })
  }

  if (isLoading) {
    return <Loading />
  }

  if (!specificProduct) {
    return (
      <div className="text-center py-20">
        <p className="text-customGray text-lg">Product not found.</p>
      </div>
    )
  }

  const isOutOfStock = specificProduct.stock === 0

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
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 flex-1 relative">
            <Image
              src={specificProduct.imageUrl || "/placeholder.svg"}
              alt={specificProduct.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="bg-error text-white px-6 py-3 font-bold text-xl">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </div>


        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{specificProduct.title}</h1>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              $ {Number(specificProduct.price).toLocaleString()}
            </p>
            {/* Stock Status */}
            <div className="mt-3">
              {isOutOfStock ? (
                <span className="text-error font-semibold">Out of Stock</span>
              ) : specificProduct.stock <= 5 ? (
                <span className="text-orange-500 font-semibold">
                  Only {specificProduct.stock} left in stock - order soon!
                </span>
              ) : (
                <span className="text-success font-semibold">
                  In Stock ({specificProduct.stock} available)
                </span>
              )}
            </div>
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
                disabled={quantity <= 1 || isOutOfStock}
                className="text-gray-600 hover:text-gray-900"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="mx-3 text-lg font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= specificProduct.stock || isOutOfStock}
                className="text-gray-600 hover:text-gray-900"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="flex-1"
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>

          <Separator className="my-6" />

          {/* Additional Details */}
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="text-gray-500 font-medium w-24">Category:</span>
              <span className="text-gray-900 capitalize">{specificProduct.category || "Not Specified"}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 font-medium w-24">Tags:</span>
              <span className="text-gray-900">{specificProduct.tags?.join(', ') || "N/A"}</span>
            </div>
            {specificProduct.discountPercentage > 0 && (
              <div className="flex">
                <span className="text-gray-500 font-medium w-24">Discount:</span>
                <span className="text-success font-semibold">{specificProduct.discountPercentage}% OFF</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
