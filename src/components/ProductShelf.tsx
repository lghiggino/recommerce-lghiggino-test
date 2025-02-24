import React, { useEffect, useState } from 'react'
import './ProductShelf.scss'

// Define types based on the provided JSON schema
interface ProductCardConfiguration {
  showDiscountBadge?: boolean
  bordered?: boolean
}

interface SelectedFacet {
  key: string
  value: string
}

interface ProductShelfProps {
  title: string
  numberOfItems: number
  itemsPerPage?: number
  after: number
  sort:
    | 'discount_desc'
    | 'name_asc'
    | 'name_desc'
    | 'orders_desc'
    | 'price_asc'
    | 'price_desc'
    | 'release_desc'
    | 'score_desc'
  term?: string
  selectedFacets?: SelectedFacet[]
  productCardConfiguration?: ProductCardConfiguration
  remoteConfigKey?: string
}

// Mock product interface for demonstration
interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  imageUrl: string
  discount?: number
}

const ProductShelf: React.FC<ProductShelfProps> = ({
  title,
  numberOfItems = 3,
  itemsPerPage = 3,
  after = 0,
  sort = 'score_desc',
  term,
  selectedFacets,
  productCardConfiguration = {
    showDiscountBadge: true,
    bordered: true,
  },
  remoteConfigKey,
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)

  // Mock function to fetch products
  // In a real implementation, this would be replaced with an actual API call
  const fetchProducts = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock product data
      const mockProducts: Product[] = Array.from({ length: numberOfItems }).map((_, index) => ({
        id: `product-${index + 1}`,
        name: `Product ${index + 1}`,
        price: 100 - index * 5,
        originalPrice: index % 2 === 0 ? 120 - index * 5 : undefined,
        imageUrl: `https://via.placeholder.com/200x200?text=Product${index + 1}`,
        discount: index % 2 === 0 ? 20 : undefined,
      }))

      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchProducts()
  }, [numberOfItems, sort, term, selectedFacets, after])

  const totalPages = Math.ceil(products.length / itemsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  // Get current page products
  const currentProducts = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  if (loading) {
    return (
      <div className="product-shelf">
        <h2 className="product-shelf__title">{title}</h2>
        <div className="product-shelf__loading">Loading products...</div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="product-shelf">
        <h2 className="product-shelf__title">{title}</h2>
        <div className="product-shelf__empty">No products found</div>
      </div>
    )
  }

  return (
    <div className="product-shelf">
      <h2 className="product-shelf__title">{title}</h2>

      <div className="product-shelf__carousel">
        {currentPage > 0 && (
          <button
            className="product-shelf__carousel-control product-shelf__carousel-control--prev"
            onClick={handlePrevPage}
            aria-label="Previous page"
          >
            &lt;
          </button>
        )}

        <div className="product-shelf__products">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className={`product-card ${productCardConfiguration?.bordered ? 'product-card--bordered' : ''}`}
            >
              <div className="product-card__image-container">
                <img src={product.imageUrl} alt={product.name} className="product-card__image" />
                {productCardConfiguration?.showDiscountBadge && product.discount && (
                  <span className="product-card__discount-badge">{product.discount}% OFF</span>
                )}
              </div>
              <div className="product-card__details">
                <h3 className="product-card__name">{product.name}</h3>
                <div className="product-card__price-container">
                  {product.originalPrice && (
                    <span className="product-card__original-price">${product.originalPrice.toFixed(2)}</span>
                  )}
                  <span className="product-card__price">${product.price.toFixed(2)}</span>
                </div>
                <button className="product-card__add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        {currentPage < totalPages - 1 && (
          <button
            className="product-shelf__carousel-control product-shelf__carousel-control--next"
            onClick={handleNextPage}
            aria-label="Next page"
          >
            &gt;
          </button>
        )}
      </div>

      {totalPages > 1 && (
        <div className="product-shelf__pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`product-shelf__pagination-dot ${
                currentPage === index ? 'product-shelf__pagination-dot--active' : ''
              }`}
              onClick={() => setCurrentPage(index)}
              aria-label={`Page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductShelf
