import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionDataProps {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<TransactionDataProps, 'id' | 'createdAt'>

interface TransactionsContextData {
  transactions: TransactionDataProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionDataProps[]>([]);

  useEffect(() =>{
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  },[]);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transaction", {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction
    ])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}