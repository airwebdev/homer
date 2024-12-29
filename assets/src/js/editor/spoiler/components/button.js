const { BlockControls } = wp.blockEditor;
const { ToolbarGroup, ToolbarDropdownMenu } = wp.components;
const { __ } = wp.i18n;

export default ({ onToggle, isActive }) => {
    return (
        <div>
            <BlockControls>
                {isActive && (
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={ homer.icons.more }
                            label={__('Show More', homer.name)}
                            className="typewriter-toolbar-btn active"
                            controls={ [
                                {
                                    title: __('Show More: Remove', homer.name),
                                    icon: 'trash',
                                    onClick: onToggle,
                                }
                            ] }
                        />
                    </ToolbarGroup>
                )}
            </BlockControls>
        </div>
    );
};
