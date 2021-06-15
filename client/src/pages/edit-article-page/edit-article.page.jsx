import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import EditorJs from 'react-editor-js';
import Box from '@material-ui/core/Box';
import { EDITOR_JS_TOOLS } from '../create-article-page/editor.config';
import { editorAtom, getArticle } from '../../global/global.state';

const EditArticlePage = () => {
    const [content, setContent] = useState(null);
    const setEditorContent = useSetRecoilState(editorAtom);
    const response = useRecoilValue(getArticle)
    const data = response.data.result;

    useEffect(() => {
        const newContent = JSON.parse(JSON.stringify(content));
        setEditorContent(newContent);
    }, [content])

    return (
        <Box p={4}>
            <EditorJs
                placeholder='Start by adding a Header!'
                tools={EDITOR_JS_TOOLS}
                logLevel='ERROR'
                onChange={(_, data) => setContent(data)}
                data={data}
            />
        </Box>
    );
}

export default EditArticlePage;