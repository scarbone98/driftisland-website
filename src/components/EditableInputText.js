import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import {Flex, Box} from 'reflexbox';
import './_editableTextInput.scss';

export default function EditableInputText({name, onChange}) {
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    function onPress(e) {
        const style = e.target.getAttribute("data-value");
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }

    function onEditorChange(e) {
        setEditorState(e);
        const parameter = {
            target: {
                name,
                value: convertToRaw(editorState.getCurrentContent())

            }
        };
        onChange(parameter);
    }

    return (
        <div>
            <Flex className="style-element-container">
                <Box className="style-element">
                    <div onClick={onPress} data-value={'ITALIC'} style={{fontStyle: 'italic'}}>I</div>
                </Box>
                <Box className="style-element">
                    <div onClick={onPress} data-value={'BOLD'} style={{fontWeight: 'bold'}}>B</div>
                </Box>
                <Box className="style-element">
                    <div onClick={onPress} data-value={'UNDERLINE'} style={{textDecoration: 'underline'}}>U</div>
                </Box>
            </Flex>
            <div className="editor-input">
                <Editor
                    editorState={editorState}
                    onChange={onEditorChange}
                />
            </div>
        </div>
    )
}