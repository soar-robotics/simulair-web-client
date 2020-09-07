import React from 'react';

const Divider = (props) => {
    const {spacing} = props;

    return (
      <div style={{"display": "block", "marginBottom": spacing, "width": "100%"}} />
    );
};

export default Divider;