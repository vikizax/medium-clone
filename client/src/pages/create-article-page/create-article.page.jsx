import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import EditorJs from 'react-editor-js';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import { EDITOR_JS_TOOLS } from './editor.config';
import { editorAtom } from '../../global/global.state';

const useStyle = makeStyles((theme) => (
    {
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        }
    }
));


const CreateArticlePage = () => {
    const classes = useStyle();
    const setEditoContent = useSetRecoilState(editorAtom);
    const [content, setContent] = useState('');

    useEffect(() => {
        const newContent = JSON.parse(JSON.stringify(content));
        setEditoContent(newContent);
    }, [content])

    return (
        <Box p={4}>
            <EditorJs
                placeholder='Start by adding a Header!'
                tools={EDITOR_JS_TOOLS}
                logLevel='ERROR'
                onChange={(_, data) => setContent(data)}
            />
        </Box>
    );
}

export default CreateArticlePage;