import React from 'react'
import ReactDOM from 'react-dom/client'
import { createServer, Model } from 'miragejs'
import { App } from './App'

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de website",
          type: "deposit",
          category: "dev",
          amount: 6000,
          createdAt: new Date("2022-12-12 09:00:00"),
        },
        {
          id: 2,
          title: "Camisa e Bermuda",
          type: "withdraw",
          category: "Roupas",
          amount: 230,
          createdAt: new Date("2022-12-14 11:00:00"),
        }
      ]
    })
  },

  routes() {
    this.namespace = "api"

    this.get("/transactions", () => {
      return this.schema.all("transaction")
    })

    this.post("/transaction", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    })
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
