import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../create-article-page/editor.config';
import { getArticle } from '../../global/action';

const ArticlePage = () => {
    const params = useParams();
    const { data, isLoading, error } = useQuery(['articleQ', params.id], getArticle);

    if (isLoading) {
        return (<LinearProgress />);
    }

    if (error) {
        return (<div>{error.response.statusText}</div>);
    }

    return (
        <Box p={4}>
            <EditorJs
                tools={EDITOR_JS_TOOLS}
                logLevel='ERROR'
                data={data}
                readOnly={true}
            />
        </Box>
    )
}

export default ArticlePage;