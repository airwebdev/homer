const { URLPopover } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

export default ({ openPopup, anchor, name, onToggle }) => {
    return (
        <URLPopover
            className="homer-popover"
            anchor={anchor}
			focusOnMount={ false }
            placement="bottom"
        >
            <div className="homer-popover-controls">
                <span className='homer-popover-title'>{ name }</span>
                <Button
                    icon="edit"
                    className='homer-button'
                    onClick={openPopup}
                />
                <Button
                    icon="trash"
                    className='homer-button trash'
                    onClick={onToggle}
                />
            </div>
        </URLPopover>
    );
};
