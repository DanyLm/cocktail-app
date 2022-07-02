import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/system';
import { Typography } from '@mui/material';

const HighlightText = memo(({ text, highlight }) => {
    const theme = useTheme();
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <Typography>
            {parts.map((part, index) =>
                part.toLowerCase().match(regex) ? (
                    // eslint-disable-next-line react/no-array-index-key
                    <font key={index} style={{ color: theme.palette.secondary.main }}>
                        {part}
                    </font>
                ) : (
                    part
                )
            )}
        </Typography>
    );
});

HighlightText.propTypes = {
    text: PropTypes.string.isRequired,
    highlight: PropTypes.string.isRequired
};

export default HighlightText;
