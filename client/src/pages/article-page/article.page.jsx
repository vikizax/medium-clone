import React from 'react';
import { useRecoilValue } from 'recoil';
import Box from '@material-ui/core/Box';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../create-article-page/editor.config';
import { getArticle } from '../../global/global.state';

const ArticlePage = () => {

    const response = useRecoilValue(getArticle);
    const content = response.data.result;

    return (
        <Box p={4}>
            {
                content ? (
                    <EditorJs
                        tools={EDITOR_JS_TOOLS}
                        logLevel='ERROR'
                        data={content}
                        readOnly={true}
                    />
                ) : 'EMPTY'
            }
        </Box>
    )
}

export default ArticlePage;