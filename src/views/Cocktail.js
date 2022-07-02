import { Link } from 'react-router-dom';
import { Stack, Typography, Grid, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Personnalized components
import useCocktail from '../contexts/useCocktail';
import { Ingredient } from './components';
import { DrinkLabelSkeleton, PreparationSkeleton, IngredientSkeleton } from '../skeletons';

const Cocktail = () => {
    const { cocktail, appState } = useCocktail();
    const countIngredients = Object.entries(cocktail ?? {}).filter(
        ([key, value]) => key.includes('strIngredient') && value
    ).length;

    return (
        <Stack spacing={4}>
            <div>
                <Button
                    startIcon={<ArrowBackIcon />}
                    color="primary"
                    size="small"
                    variant="contained"
                    LinkComponent={Link}
                    to="/"
                >
                    Retour à la liste
                </Button>
            </div>
            <div>
                {appState === 'loading' ? (
                    <DrinkLabelSkeleton />
                ) : (
                    <>
                        <Typography variant="h3" color="primary">
                            {cocktail.strDrink}
                        </Typography>
                        <Typography variant="body2">
                            {cocktail.strGlass} - {cocktail.strCategory} {cocktail.strAlcoholic}
                        </Typography>
                    </>
                )}
            </div>
            <div>
                <Typography variant="h4" color="secondary" gutterBottom>
                    Ingrédients ({countIngredients})
                </Typography>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    {appState === 'loading'
                        ? [...Array(3)].map((_, i) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <Grid item key={i}>
                                  <IngredientSkeleton />
                              </Grid>
                          ))
                        : Object.entries(cocktail).map(
                              ([key, value]) =>
                                  key.includes('strIngredient') &&
                                  value && (
                                      <Grid item key={key}>
                                          <Ingredient
                                              entrieKey={key}
                                              value={value}
                                              cocktail={cocktail}
                                          />
                                      </Grid>
                                  )
                          )}
                </Grid>
            </div>
            <div>
                <Typography variant="h4" color="secondary" gutterBottom>
                    Préparation
                </Typography>
                {appState === 'loading' ? (
                    <PreparationSkeleton />
                ) : (
                    <Typography paragraph>{cocktail.strInstructions}</Typography>
                )}
            </div>
        </Stack>
    );
};

export default Cocktail;
