import React, { useEffect, useState } from 'react';

import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './components/editor/editor.config';

const App = () => {
  let editorInstance = null
  const [editorContent, setEditorContent] = useState({});

  useEffect(() => {
    return () => editorInstance.destory();
  }, [editorInstance]);

  return (<div id='container'>
    <EditorJs
      instanceRef={instance => editorInstance = instance}
      placeholder='Start by adding a Header!'
      tools={EDITOR_JS_TOOLS}
      onChange={
        (_, data) => {
          setEditorContent(data);
        }
      }
      logLevel='ERROR'
    />
  </div>
  )
}

export default App;
