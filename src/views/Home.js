import { useTheme } from '@mui/system';
import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Paper,
    Stack,
    TextField,
    InputAdornment,
    Typography
} from '@mui/material';

// Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';

// Personnalized components
import { getCocktailByNameOrByIngredient } from '../api/cocktailApi';
import useCocktail from '../contexts/useCocktail';
import { Thumbnail, HighlightText } from './components';
import { HomeSkeleton } from '../skeletons';

const Home = () => {
    const { searchInput, setSearchInput, cocktails, setCocktails, appState, setAppState } =
        useCocktail();
    const theme = useTheme();

    useEffect(() => {
        const controller = new AbortController();

        const inputTimeout = setTimeout(() => {
            getCocktailByNameOrByIngredient(searchInput, controller)
                .then(res => {
                    setCocktails(res);
                    setAppState('idle');
                })
                // eslint-disable-next-line no-console
                .catch(err => console.error(err));

            setAppState('loading');
        }, 600);

        return () => {
            controller.abort();
            clearTimeout(inputTimeout);
        };
    }, [searchInput]);

    let renderedChildren = null;

    if (appState === 'loading') {
        const limit = cocktails.length > 0 ? cocktails.length : 10;
        renderedChildren = [...Array(limit)].map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <HomeSkeleton key={i} divider={i !== limit - 1} />
        ));
    } else if (cocktails.length === 0) {
        renderedChildren = <ListItem>No cocktails found</ListItem>;
    } else {
        renderedChildren = cocktails.map((cocktail, index) => (
            <ListItem
                // eslint-disable-next-line react/no-array-index-key
                key={`${cocktail.idDrink}_${index}`}
                divider={cocktails.length - 1 !== index}
                secondaryAction={
                    <IconButton
                        edge="start"
                        aria-label="goto"
                        LinkComponent={Link}
                        to={`/cocktail/${cocktail.idDrink}`}
                    >
                        <ArrowForwardIcon color="primary" />
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Thumbnail src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        searchInput ? (
                            <HighlightText text={cocktail.strDrink} highlight={searchInput} />
                        ) : (
                            cocktail.strDrink
                        )
                    }
                    secondary={
                        cocktail.strGlass ? (
                            `${cocktail.strGlass} - ${cocktail.strCategory} ${cocktail.strAlcoholic}`
                        ) : (
                            <font style={{ color: theme.palette.secondary.main }}>
                                Trouvé(e) dans la recette
                            </font>
                        )
                    }
                />
            </ListItem>
        ));
    }

    return (
        <Stack spacing={2}>
            <div />
            <Paper>
                <TextField
                    autoFocus
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    fullWidth
                    placeholder="Rechercher un cocktail (par ingrédient ou par nom)"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" onClick={() => setSearchInput('')}>
                                <IconButton>
                                    <ClearIcon color="primary" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Paper>
            <Paper>
                <List>
                    <ListItem>
                        <Typography variant="body2" color="primary">
                            Nombre de résultats : {cocktails.length}
                        </Typography>
                    </ListItem>

                    {renderedChildren}
                </List>
            </Paper>
            <div />
        </Stack>
    );
};

export default memo(Home);
