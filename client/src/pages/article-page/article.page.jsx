import React from 'react';
import { useQuery } from 'react-query';
import { withRouter } from 'react-router';
import Box from '@material-ui/core/Box';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../create-article-page/editor.config';
import { getArticle } from '../../global/action';

const ArticlePage = ({ match: { params: { id } } }) => {

    // const { data, isLoading, error } = useQuery('articleQ', getArticle)

    return (
        <Box p={4}>
            {/* {
                isLoading && (<div>Loading!</div>)
            }

            {
                error && (<div>{error}</div>)
            }

            {
                data && (
                    <EditorJs
                        tools={EDITOR_JS_TOOLS}
                        logLevel='ERROR'
                        data={data}
                        readOnly={true}
                    />
                )
            } */}
        </Box>
    )
}

export default withRouter(ArticlePage);