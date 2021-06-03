import EditorJS from '@editorjs/editorjs';

const Editor = () => {


    const editorjs = new EditorJS({
        placeholder: 'Start with adding a Title!',
        holder: 'editorjs',
        tools: {
            header: Header
        }
    });
    return (
        <div id='editorjs'></div>
    );
}