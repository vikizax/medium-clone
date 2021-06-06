import React, { useState, useEffect } from 'react';
import EditorJs from 'react-editor-js';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';
import { EDITOR_JS_TOOLS } from './editor.config';

const useStyle = makeStyles((theme) => (
    {
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        }
    }
));

const CreateArticlePage = () => {
    const classes = useStyle();
    let editorInstance;
    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
        return () => {
            editorInstance.destroy();
        }
    }, [editorInstance])

    const saveContent = () => {
        //
    }

    console.log(editorContent)

    return (
        <Box p={4}>
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
            <Fab variant="extended" className={classes.fab} onClick={() => saveContent()}>
                <Add color='action'/>
                Publish
            </Fab>
        </Box>
    )
}

export default CreateArticlePage;