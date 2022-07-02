import { createContext, useEffect, useState, useMemo, useRef } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getRandomCocktails, getCocktail } from '../api/cocktailApi';

/**
 * Context for cocktails.
 */
export const CocktailContext = createContext();

const CocktailContextProvider = () => {
    const [cocktails, setCocktails] = useState([]);
    const [cocktail, setCocktail] = useState({});
    const [appState, setAppState] = useState('idle');
    const [searchInput, setSearchInput] = useState('');

    const { cocktailId } = useParams();
    const mounted = useRef(false);

    /**
     * On application start
     */
    useEffect(() => {
        if (mounted.current) {
            setAppState('loading');
            getRandomCocktails(10)
                .then(res => setCocktails(res))
                // eslint-disable-next-line no-console
                .catch(err => console.error(err))
                .finally(() => setAppState('idle'));
        }

        return () => {
            mounted.current = true;
        };
    }, []);

    useEffect(() => {
        if (cocktailId) {
            setAppState('loading');
            getCocktail(cocktailId)
                .then(res => setCocktail(res))
                // eslint-disable-next-line no-console
                .catch(err => console.error(err))
                .finally(() => setAppState('idle'));
        } else {
            setCocktail({});
        }
    }, [cocktailId]);

    const providerValue = useMemo(
        () => ({
            cocktails,
            cocktail,
            appState,
            setAppState,
            setCocktails,
            searchInput,
            setSearchInput
        }),
        [appState, cocktails, cocktail, searchInput]
    );

    return (
        <CocktailContext.Provider value={providerValue}>
            <Outlet />
        </CocktailContext.Provider>
    );
};

export default CocktailContextProvider;
