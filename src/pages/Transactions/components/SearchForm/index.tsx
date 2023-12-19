import { MagnifyingGlass } from 'phosphor-react';
import { SeartchFormContainer } from './styles';

export function SearchForm() {
    return (
        <SeartchFormContainer>
            <input placeholder="Busque por transaçoes" />
            <button type="submit">
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SeartchFormContainer>
    );
}
