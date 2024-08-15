import React from 'react'

export default function ConditionalAnimation({children, Animation1, Animation2, condition1, condition2}) {
  if (condition1) {
    return (
      <Animation1>
        {children}
      </Animation1>
    );
  } else if (condition2) {
    return(
      <Animation2>
        {children}
      </Animation2>
    );
  }
}
