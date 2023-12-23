import { ReactNode, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface CreateTransacrionInput {
    description: string;
    category: string;
    price: number;
    type: 'income' | 'outcome';
}

interface TransactionsContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransacrionInput) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // useEffect(() => {
    //     //usamos useeffect para que a requisicao seja enviada somente uma vez
    //     fetch('http://localhost:3000/transactions')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         });
    // }, []);
    // OU:

    const fetchTransactions = useCallback(async (query?: string) => {
        {
            // const url = new URL('transactions');

            // if (query) {
            //     url.searchParams.append('q', query);
            // }

            // const response = await fetch(url);
            // const data = await response.json();
            // OU COM AXIOS:

            const response = await api.get('transactions', {
                params: {
                    _sort: 'createdAt',
                    _order: 'desc',
                    q: query,
                },
            });

            setTransactions(response.data);
        }
    }, []);

    const createTransaction = useCallback(
        async (data: CreateTransacrionInput) => {
            const { description, category, price, type } = data;

            const response = await api.post('transactions', {
                // description: data.description,
                // category: data.category,
                // price: data.price,
                // type: data.type,
                //OU
                //...data,
                //OU
                description,
                category,
                price,
                type,
                createdAt: new Date(),
            });

            setTransactions((state) => [response.data, ...state]);
        },
        []
    );

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return (
        <TransactionsContext.Provider
            value={{ transactions, fetchTransactions, createTransaction }}
        >
            {children}
        </TransactionsContext.Provider>
    );
}
