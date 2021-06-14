import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Box from '@material-ui/core/Box';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../create-article-page/editor.config';
import api from '../../constant/api.constant';

const ArticlePage = () => {
    const [content, setContent] = useState(null);
    const params = useParams();

    useEffect(() => {
        (async () => {
            const response = await axios.get(api.article + `/${params.id}`)
            setContent(response.data.result)
        })()
    }, [])

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
                ) : ''
            }
        </Box>
    )
}

export default ArticlePage;