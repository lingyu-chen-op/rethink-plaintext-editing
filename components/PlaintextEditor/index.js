import React, { useState, useEffect } from 'react';
import path from 'path';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';

import css from '../../pages/style.module.css';

function PlaintextEditor({ file, write }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    (async () => {
      setContent(await file.text());
    })();
  }, [file]);

  const contentEditable = React.createRef();

  const handleChange = contentValue => {
    setContent(contentValue);
    const newFile = new File([contentValue], path.basename(file.name), {
      type: file.type,
      lastModified: new Date()
    });
    write(newFile);
  };

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>
        <ContentEditable
          innerRef={contentEditable}
          html={content}
          disabled={false}
          onChange={e => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
