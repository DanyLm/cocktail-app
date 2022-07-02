import {
    createTheme,
    StyledEngineProvider,
    ThemeProvider,
    responsiveFontSizes
} from '@mui/material';
import PropTypes from 'prop-types';
import { orange, deepOrange } from '@mui/material/colors';

const theme = responsiveFontSizes(
    createTheme({
        palette: {
            primary: deepOrange,
            secondary: orange
        }
    })
);

const DefaultThemeProvider = ({ children }) => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
);

export default DefaultThemeProvider;

DefaultThemeProvider.propTypes = {
    children: PropTypes.element.isRequired
};
