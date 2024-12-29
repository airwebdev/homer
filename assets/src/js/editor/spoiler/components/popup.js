const { URLPopover } = wp.blockEditor;
const { Button } = wp.components;
const { HomerColorPicker } = homer.components;
const { __ } = wp.i18n;

export default ({ text, setText, color, setColor, underline, setUnderline, anchor, onToggle }) => {
    const onChange = e => setText(e.target.innerText);

    const style = {
        color: color,
        'text-decoration': underline ? 'underline': 'none'
    }

    return (
        <URLPopover
            className="homer-popover"
            anchor={anchor}
            placement="bottom-start"
            headerTitle={__('Customize Show More', homer.name)}
        >
            <label className="homer-popover-label pl pb">{__('Show more button settings', homer.name)}</label>
            <div className="homer-popover-controls">
                <span className="homer-popover-content" onBlur={onChange} contenteditable="true" style={style}>{text}</span>
                <HomerColorPicker color={color} onChange={value => setColor(value ? value : '#000')} />
                <Button
                    icon="editor-underline"
                    label={__('Add underline', homer.name)}
                    className={underline === 'true' ? 'homer-button active' : 'homer-button'}
                    onClick={() => {
                        setUnderline(underline === 'true' ? '' : 'true');
                    }}
                />
                <Button
                    icon="trash"
                    className='homer-button'
                    label={__('Show more: Remove', homer.name)}
                    onClick={onToggle}
                />
            </div>
        </URLPopover>
    );
};
