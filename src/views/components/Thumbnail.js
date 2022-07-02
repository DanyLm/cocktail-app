import { memo } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';

const Thumbnail = ({ src, alt, size }) => {
    return <Avatar sx={{ width: size, height: size }} src={src} alt={alt} />;
};

Thumbnail.defaultProps = {
    alt: 'This is an image of an ingredient or a drink',
    size: 44
};

Thumbnail.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    size: PropTypes.number
};

export default memo(Thumbnail);
