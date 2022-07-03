/* eslint-disable import/prefer-default-export */
import axios from './axios';
import { alphabeticalOrder } from '../utils/sort';

/**
 *
 * @param {*} input
 * @param {*} controller
 * @returns
 */
export const getCocktailByNameOrByIngredient = async (input, controller) => {
    try {
        const response = [];
        const key = input.length === 1 ? 'f' : 's';
        const byName = await axios.get(`/search.php?${key}=${input}`, {
            signal: controller.signal
        });
        const byIngredient = await axios.get(`/filter.php?i=${input}`, {
            signal: controller.signal
        });

        Promise.all([byName, byIngredient]).then((...res) => {
            const [byNameRes, byIngredientRes] = res[0];

            if (byNameRes.status === 200) {
                response.push(...(byNameRes.data?.drinks ?? []));
            }

            if (byIngredientRes.status === 200) {
                const byIngredientDrinks = byIngredientRes.data?.drinks ?? [];

                if (byIngredientDrinks.length > 0) {
                    byIngredientDrinks.forEach(drink => {
                        if (!response.find(row => row.idDrink === drink.idDrink)) {
                            response.push(drink);
                        }
                    });
                }
            }

            alphabeticalOrder(response, 'strDrink');
        });

        return response;
    } catch (err) {
        throw err.message;
    }
};

/**
 *
 * @param {*} cocktailId
 * @returns
 */
export const getCocktail = async cocktailId => {
    try {
        const response = await axios.get(`/lookup.php?i=${cocktailId}`);
        return response.status === 200 ? response.data?.drinks[0] : {};
    } catch (err) {
        throw err.message;
    }
};

/**
 *
 * @returns
 */
export const getRandomCocktail = async () => {
    try {
        const response = await axios.get('/random.php');
        return response.status === 200 ? response.data?.drinks[0] : {};
    } catch (err) {
        throw err.message;
    }
};

/**
 *
 * @param {*} limit
 * @returns
 */
export const getRandomCocktails = async limit => {
    const cocktails = [];

    for (let i = 0; i < limit; i += 1) {
        cocktails.push(getRandomCocktail());
    }

    try {
        const response = await Promise.all(cocktails);
        alphabeticalOrder(response, 'strDrink');
        return response;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return [];
    }
};
