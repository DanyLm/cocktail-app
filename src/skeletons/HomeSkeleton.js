import PropTypes from 'prop-types';
import { Skeleton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const HomeSkeleton = ({ divider }) => {
    return (
        <ListItem divider={divider}>
            <ListItemAvatar>
                <Skeleton animation="wave" variant="circular" width={44} height={44} />
            </ListItemAvatar>
            <ListItemText
                primary={<Skeleton animation="wave" width="50%" />}
                secondary={<Skeleton animation="wave" width="20%" />}
            />
        </ListItem>
    );
};

HomeSkeleton.propTypes = {
    divider: PropTypes.bool.isRequired
};

export default HomeSkeleton;
