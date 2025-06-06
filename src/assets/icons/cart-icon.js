// components/UilCart.jsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function CartIcon(props) {
  return (
    <Svg
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 4 0v1h-4Zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2Z"
        fill={props.color || '#000'}
      />
    </Svg>
  );
}