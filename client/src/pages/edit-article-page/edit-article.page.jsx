import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import EditorJs from 'react-editor-js';
import Box from '@material-ui/core/Box';
import { EDITOR_JS_TOOLS } from '../create-article-page/editor.config';
import { editorAtom } from '../../global/global.state';
import { getUserArticle } from '../../global/action';

const EditArticlePage = () => {
    const [content, setContent] = useState(null);
    const setEditorContent = useSetRecoilState(editorAtom);
    const params = useParams();
    const { data, isLoading, isError } = useQuery(['articleQ', params.id], getUserArticle);

    useEffect(() => {
        const newContent = JSON.parse(JSON.stringify(content));
        setEditorContent(newContent);
    }, [content]);

    if (isLoading) {
        return (<div>Loading...</div>)
    }

    if (isError) {
        return (<div>{ }</div>)
    }

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