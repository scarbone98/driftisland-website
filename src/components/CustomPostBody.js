import React, {useState, useRef, useContext, useEffect, useLayoutEffect, createContext} from 'react';
import {Flex, Box} from 'reflexbox';


export default function CustomBody() {
    const ref = useRef(null);
    const [toolBar, setToolBar] = useState({active: false, position: null});
    const [formattedText, setFormattedText] = useState([]);
    const [prevText, setPrevText] = useState(null);
    const [currentSelection, setCurrentSelection] = useState(null);
    function onMouseUp(e) {
        const selection = window.getSelection();
        if (selection.toString().length) {
            const bound = selection.getRangeAt(0).getBoundingClientRect();
            setToolBar({active: true, position: {left: e.clientX, top: bound.y}});
            setCurrentSelection(window.getSelection().getRangeAt(0));
        } else {
            setToolBar({active: false, position: null});
            setCurrentSelection(null);
        }
    }

    function findDiffIndexRange(a, b) {
        let start;
        let end;
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            if (a.charAt(i) !== b.charAt(i)) {
                start = i;
                if (a.length > b.length) {
                    while (i < a.length && a.charAt(i) !== b.charAt(start)) i++;
                } else if (b.length > a.length) {
                    while (i < b.length && b.charAt(i) !== a.charAt(start)) i++;
                } else {
                    while (i < b.length && i < a.length && a.charAt(i) !== b.charAt(i)) i++;
                }
                end = i;
                return [start, end];
            }
        }
        return [null, null];
    }

    function findObjectsThatIntersect(start, end) {
        const objects = [];
        for (let i = 0; i < formattedText.length; i++) {
            if ((formattedText[i].start <= start && formattedText[i].end >= start) ||
                (formattedText[i].start <= end && formattedText[i].end >= end)) {
                objects.push(formattedText[i]);
            }
        }
        return objects;
    }

    function onChange(e) {
        const textValue = ref.current.textContent;
        // EMPTY
        if (!textValue.length) {
            setFormattedText([]);
        }
        // First value added
        else if (!prevText) {
            setFormattedText([
                {
                    start: 0,
                    end: textValue.length,
                    value: textValue,
                    type: 'regular'
                }
            ])
        } else {
            const [start, end] = findDiffIndexRange(prevText, textValue);
            if (start === null) return;
            const obj = findObjectsThatIntersect(start, end)[0];

            // DELETE OCCURRED
            if (prevText.length > textValue.length) {
                obj.value = obj.value.substring(0, start) + obj.value.substring(end, obj.value.length);
                obj.end = obj.value.length;
            }
            // INSERT OCCURRED
            else {
                obj.value = obj.value.substring(0, start) + textValue.substring(start, end) + obj.value.substring(end-1, obj.value.length);
                obj.end = obj.value.length;
            }
            setFormattedText(formattedText);
        }
        setPrevText(textValue);
    }

    console.log(formattedText);
    return (
        <ParagraphContext.Provider value={{formattedText, setFormattedText, findObjectsThatIntersect, currentSelection}}>
            {toolBar.active && <ToolBar style={toolBar.position}/>}
            <div
                ref={ref}
                contentEditable
                onMouseUp={onMouseUp}
                tabIndex="0"
                onInput={onChange}
            >
            </div>
        </ParagraphContext.Provider>
    )
}


function ToolBar({style}) {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    useLayoutEffect(() => {
        if (ref.current) {
            setHeight(ref.current.getBoundingClientRect().height);
        }
    }, [ref]);


    const {formattedText, setFormattedText, findObjectsThatIntersect, currentSelection} = useContext(ParagraphContext);


    function onClick(e) {
        const style = e.target.attributes.getNamedItem('data-style').value;
        const {startOffset, endOffset} = currentSelection;
        const objects = findObjectsThatIntersect(startOffset, endOffset);
        const copyItems = [...formattedText];
        for (let i = 0; i < objects.length; i++) {
            const {start, end} = objects[i];
            // BOTH ARE IN RANG WE NEED TO SPLIT THEM
            if (start >= startOffset && start <= endOffset && end >= startOffset && end <= endOffset) {

            } else if (start >= startOffset && start <= endOffset) {

            } else {

            }
        }
    }

    return (
        <div
            ref={ref}
            style={
                {
                    position: 'absolute',
                    backgroundColor: 'red',
                    ...style,
                    top: style.top - height - 10
                }
            }
        >
            <Flex>
                <Box name="red" data-style="color:red;" style={{height: 50, width: 50, backgroundColor:'red'}} onClick={onClick}>

                </Box>
                <Box name="blue" data-style="color:blue;" style={{height: 50, width: 50, backgroundColor:'blue'}} onClick={onClick}>

                </Box>
            </Flex>
        </div>
    )
}

const ParagraphContext = createContext(null);