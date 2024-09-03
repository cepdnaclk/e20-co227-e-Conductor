import React from 'react';

export default function ConditionalAnimation({ children, Animation1, Animation2, condition1, condition2, sx, props1={}, props2={}}) {
  if (condition1) {
    return (
      <Animation1 sx={sx} {...props1}>
        {children}
      </Animation1>
    );
  } else if (condition2) {
    return (
      <Animation2 sx={sx} {...props2}>
        {children}
      </Animation2>
    );
  } else {
    return (
      <>
        {children}
      </>
    );
  }
}
