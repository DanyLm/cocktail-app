import { useContext } from 'react';
import { CocktailContext } from './CocktailContext';

export default () => {
    return useContext(CocktailContext);
};
