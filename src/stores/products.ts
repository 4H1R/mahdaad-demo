import { defineStore } from 'pinia'

const customers = [
  { id: 1, name: 'Ahmad', city: 'Tehran' },
  { id: 2, name: 'Mehran', city: 'Shiraz' },
  { id: 3, name: 'Ali', city: 'Esfahan' },
]

const products = [
  { id: 101, name: 'Laptop', category: 'Electronics' },
  { id: 102, name: 'Mouse', category: 'Electronics' },
  { id: 103, name: 'Monitor', category: 'Electronics' },
  { id: 104, name: 'Coffee Maker', category: 'Home Appliances' },
  { id: 105, name: 'Blender', category: 'Home Appliances' },
  { id: 106, name: 'Headphones', category: 'Electronics' },
]
const purchases = [
  { customerId: 1, productId: 101, date: '2025-03-01' },
  { customerId: 1, productId: 102, date: '2025-02-02' },
  { customerId: 2, productId: 103, date: '2025-02-05' },
  { customerId: 2, productId: 104, date: '2025-02-06' },
  { customerId: 3, productId: 105, date: '2025-02-07' },
  { customerId: 3, productId: 106, date: '2025-02-08' },
  { customerId: 1, productId: 104, date: '2025-02-10' },
]

export const useProductsStore = defineStore('products', {
  state: () => ({
    customers,
    products,
    purchases,
    cart: [],
  }),
  getters: {
    getProductsPurchasedByCustomer(state) {
      return (customerId: number) => {
        const productIds = state.purchases
          .filter((p) => p.customerId === customerId)
          .map((p) => p.productId)

        return state.products.filter((p) => productIds.includes(p.id))
      }
    },
    getMostCategoryPurchasedByCustomer(state) {
      return (customerId: number) => {
        const purchasedProducts = this.getProductsPurchasedByCustomer(customerId)

        if (purchasedProducts.length === 0) return null

        const categoryCounts: Record<string, number> = {}
        let mostPurchasedCategory = state.products[0].category

        for (const product of purchasedProducts) {
          categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1

          if (categoryCounts[product.category] > categoryCounts[mostPurchasedCategory]) {
            mostPurchasedCategory = product.category
          }
        }

        return mostPurchasedCategory
      }
    },
    getRecommendationsForCustomer(state) {
      return (customerId: number) => {
        const customerBoughtProducts = this.getProductsPurchasedByCustomer(customerId)
        const targetCategories = new Set(customerBoughtProducts.map((p) => p.category))

        if (targetCategories.size === 0) return []

        const recommendedProductIds: Set<number> = new Set()
        state.customers.forEach((customer) => {
          if (customer.id === customerId) return

          this.getProductsPurchasedByCustomer(customer.id).forEach((product) => {
            if (targetCategories.has(product.category)) {
              recommendedProductIds.add(product.id)
            }
          })
        })

        const customerBoughtProductIds = new Set(customerBoughtProducts.map((p) => p.id))
        const finalRecommendationIds = [...recommendedProductIds].filter(
          (id) => !customerBoughtProductIds.has(id),
        )

        return state.products.filter((p) => finalRecommendationIds.includes(p.id))
      }
    },
  },
})
