import { Routes, Route, Navigate } from 'react-router-dom';

// Personnalized components
import { Layout } from './components';
import { Home, Cocktail } from './views';
import CocktailContextProvider from './contexts/CocktailContext';

/**
 *
 * @returns
 */
function App() {
    return (
        <Routes>
            <Route element={<CocktailContextProvider />}>
                <Route path="/" element={<Layout />}>
                    {/* Public route */}
                    <Route index element={<Home />} />
                    <Route path="cocktail/:cocktailId" element={<Cocktail />} />
                </Route>

                {/* Not found route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default App;
