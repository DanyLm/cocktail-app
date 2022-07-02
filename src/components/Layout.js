import { Outlet, useLocation, matchRoutes } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Drawer, Box } from '@mui/material';

// Personnalized components
import useCocktail from '../contexts/useCocktail';

/**
 * default drawer width
 */
const DRAWER_WIDTH = 480;

/**
 * Main component
 */
const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open
        ? {
              transition: theme.transitions.create('margin', {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen
              }),
              marginLeft: 0,
              padding: theme.spacing(4)
          }
        : {
              marginLeft: `-${DRAWER_WIDTH}px`,
              [theme.breakpoints.up('md')]: {
                  paddingLeft: theme.spacing(30),
                  paddingRight: theme.spacing(30)
              },
              [theme.breakpoints.down('md')]: {
                  paddingLeft: theme.spacing(15),
                  paddingRight: theme.spacing(15)
              }
          })
}));

/**
 *
 * @param {*} img
 * @returns
 */
const sx = img => {
    return {
        display: { xs: 'none', sm: 'block' },
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            filter: 'drop-shadow(4px 0px 9px #aaa)',
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            height: '100%',
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        }
    };
};

/**
 * Layout component
 * @returns
 */
const Layout = () => {
    const { cocktail } = useCocktail();
    const location = useLocation();
    const routes = [{ path: 'cocktail/:cocktailId' }];
    const matched = matchRoutes(routes, location);
    const openDrawer = matched?.[0].route?.path === 'cocktail/:cocktailId';

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={sx(cocktail.strDrinkThumb)}
                variant="persistent"
                anchor="left"
                open={openDrawer}
            />
            <Main open={openDrawer}>
                <Outlet />
            </Main>
        </Box>
    );
};

export default Layout;
