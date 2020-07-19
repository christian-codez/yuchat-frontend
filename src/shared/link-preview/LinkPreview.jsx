import React, { Fragment, useEffect } from 'react';
import { ReactTinyLink } from 'react-tiny-link';
import { useState } from 'react';

const LinkPreview = ({ message }) => {
  const [link, setLink] = useState(false);
  let urlRE = new RegExp(
    '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+'
  );
  useEffect(() => {
    if (message) {
      let result = message.match(urlRE);
      if (result) {
        setLink(result);
      }
    }
  }, []);

  if (link) {
    return (
      <ReactTinyLink
        cardSize='small'
        showGraphic={true}
        maxLine={2}
        minLine={1}
        url={`${link[0]}`}
      />
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default LinkPreview;
