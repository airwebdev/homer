const { BlockControls } = wp.blockEditor;
const { ToolbarGroup, ToolbarDropdownMenu } = wp.components;
const { __ } = wp.i18n;

export default ({ onToggle, openPopup }) => {
    return (
        <div>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarDropdownMenu
                        icon={ homer.icons.popover }
                        label={__('Popover', homer.name)}
                        className="typewriter-toolbar-btn active"
                        controls={ [
                            {
                                title: __('Popover: Edit', homer.name),
                                icon: 'edit',
                                onClick: openPopup,
                            },
                            {
                                title: __('Popover: Remove', homer.name),
                                icon: 'trash',
                                onClick: onToggle,
                            }
                        ] }
                    />
                </ToolbarGroup>
            </BlockControls>
        </div>
    );
};
