const { URLPopover } = wp.blockEditor;
const { Button, TextareaControl, TextControl } = wp.components;
const { __ } = wp.i18n;
const { useState, useEffect } = wp.element;

export default ({ text, setText, fz, setFz, anchor, closePopup }) => {
    
    const [textVal, setTextVal] = useState(text);
    const [fzVal, setFzVal] = useState(fz);
    const [apply, setApply] = useState(false);

    const applyChanges = () => {
        setText(textVal);
        setFz(fzVal);
    }

    const cancel = () => {
        setTextVal(text);
        setFzVal(fz);
        closePopup();
    }

    return (
        <URLPopover
            className="homer-popover"
            anchor={anchor}
            placement="bottom-start"
            headerTitle={__('Customize Popover', homer.name)}
        >
            <div className="homer-popover-controls actions">
                <Button
                    tabindex={-1}
                    className='homer-button apply'
                    onClick={cancel}
                >{__('Cancel', homer.name)}</Button>
                <Button
                    disabled={!apply}
                    className='homer-button apply'
                    onClick={applyChanges}
                >{__('Apply changes', homer.name)}</Button>
            </div>
            <div className="homer-popover-controls">
                <TextareaControl
                    label="Popover content"
                    value={textVal}
                    rows={3}
                    onChange={ val => {
                        setTextVal(val);
                        setApply(true);
                    }}
                />
            </div>
            <br/>
            <div className="homer-popover-controls">
                <TextControl 
                    value={fzVal}
                    type="number"
                    min={1}
                    className="homer-popover-number" 
                    onChange={ val => {
                        setFzVal(val);
                        setApply(true);
                    }}
                    label={__('Font size', homer.name)}
                />
            </div>
        </URLPopover>
    );
};
