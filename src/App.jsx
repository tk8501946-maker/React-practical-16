import { useState } from 'react'
import './App.css'

const initialProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 119.99,
    description: 'Noise-canceling over-ear headphones with 20-hour battery life.',
  },
  {
    id: 2,
    name: 'Classic Notebook',
    category: 'Office',
    price: 12.5,
    description: 'Hardcover notebook with premium paper for daily planning.',
  },
]

const initialFormData = {
  name: '',
  category: '',
  price: '',
  description: '',
}

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [formData, setFormData] = useState(initialFormData)
  const [feedback, setFeedback] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedName = formData.name.trim()
    const trimmedCategory = formData.category.trim()
    const trimmedDescription = formData.description.trim()
    const parsedPrice = Number(formData.price)

    if (
      !trimmedName ||
      !trimmedCategory ||
      !trimmedDescription ||
      Number.isNaN(parsedPrice) ||
      parsedPrice <= 0
    ) {
      setFeedback('Please complete all fields with valid product information.')
      return
    }

    const newProduct = {
      id: Date.now(),
      name: trimmedName,
      category: trimmedCategory,
      price: parsedPrice,
      description: trimmedDescription,
    }

    setProducts((previousProducts) => [newProduct, ...previousProducts])
    setFormData(initialFormData)
    setFeedback(`Product "${trimmedName}" added successfully.`)
  }

  return (
    <main className="app-shell">
      <section className="panel form-panel">
        <div className="panel-header">
          <p className="eyebrow">Create Product</p>
          <h1>Add New Item</h1>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          <label>
            Product Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </label>

          <label>
            Category
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Electronics"
            />
          </label>

          <label>
            Price
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the product"
            />
          </label>

          <button type="submit" className="primary-btn">
            Add Product
          </button>
        </form>

        {feedback && <p className="feedback">{feedback}</p>}
      </section>

      <section className="panel list-panel">
        <div className="panel-header">
          <p className="eyebrow">Inventory</p>
          <h2>Products</h2>
        </div>

        <div className="product-list">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-topline">
                <span className="product-category">{product.category}</span>
                <span className="product-price">${product.price.toFixed(2)}</span>
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
