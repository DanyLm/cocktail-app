import { Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Image url
 */
const IMAGE_URL = 'https://www.thecocktaildb.com/images/ingredients';

/**
 *
 * @param {*} entrieKey
 * @param {*} value
 * @param {*} cocktail
 * @returns
 */
const Ingredient = ({ entrieKey, value, cocktail }) => (
    <Card variant="outlined" sx={{ minWidth: 150, borderRadius: 8 }}>
        <CardHeader
            title={
                <Typography variant="body2" noWrap>
                    {value}
                </Typography>
            }
        />
        <CardMedia
            component="img"
            height="80"
            width="80"
            sx={{
                objectFit: 'contain'
            }}
            image={`${IMAGE_URL}/${value}.png`}
            alt={value}
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {cocktail[`strMeasure${entrieKey.slice(-1)}`] ?? '1'}
            </Typography>
        </CardContent>
    </Card>
);

Ingredient.propTypes = {
    entrieKey: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    cocktail: PropTypes.object.isRequired
};

export default Ingredient;
