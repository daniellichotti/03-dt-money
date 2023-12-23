import { MagnifyingGlass } from 'phosphor-react';
import { SeartchFormContainer } from './styles';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';
import { memo } from 'react';

/**
 *  MEMO
 * - Por que um comnponente renderiza?
 * - Hooks Change (mudou estado, contexto, reducer)
 * - Props changed (mudou propriedade)
 * - Parent rendered (componente pai mudou)
 *
 * Qual o fluxo de renderizacao
 * 1. O react recria o HTML da interface daquele componente
 * 2. Compara a versao do HTML recriada com a versao anterior
 * 3. SE mudou alguma coisa, ele reescreve o HTML na tela
 *
 * Memo:
 * 0. Hooks changed, props changed (deep comparison)
 * 0.1: Comparar a versao anterior dos hooks e props
 * 0.2: SE mudou algo, ele vai permitir a nova renderizacao
 */

const searchFormSchema = z.object({
    query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
    const fetchTransactions = useContextSelector(
        TransactionsContext,
        (context) => {
            return context.fetchTransactions;
        }
    );

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    });

    async function handleSearchTransactions(data: SearchFormInputs) {
        await fetchTransactions(data.query);
    }

    return (
        <SeartchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input
                type="text"
                placeholder="Busque por transaçoes"
                {...register('query')}
            />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SeartchFormContainer>
    );
}

export const SearchForm = memo(SearchFormComponent);
