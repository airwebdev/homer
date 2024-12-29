import '../../../scss/frontend/underline.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { toggleFormat } = wp.richText;
const { BlockControls } = wp.blockEditor;
const { select } = wp.data;
const { ToolbarGroup, ToolbarDropdownMenu } = wp.components;
const { registerFormatType } = wp.richText;


/**
 * Block constants
 */
const formatName = homer.name + '/underline';
window.homer.components.underline = true;

registerFormatType(formatName, {
    title: __('Underline', homer.name),
    tagName: 'span',
    className: 'homer-underline',
    edit({ isActive, value, onChange }) {
        const isDisabled = select('core/edit-post').isFeatureActive('homer_underline_disabled');

        const onToggle = () => {
            onChange(
                toggleFormat(value, {
                    type: formatName,
                }),
            );
        };

        return (
            !isDisabled && (
                <Fragment>
                    {isActive && (
                        <BlockControls>
                            <ToolbarGroup>
                                <ToolbarDropdownMenu
                                    icon={homer.icons.underline}
                                    label={__('Underline', homer.name)}
                                    className="typewriter-toolbar-btn active"
                                    controls={ [
                                        {
                                            title: __('Underline: Remove', homer.name),
                                            icon: 'trash',
                                            onClick: onToggle,
                                        }
                                    ] }
                                />
                            </ToolbarGroup>
                        </BlockControls>
                    )}
                </Fragment>
            )
        );
    },
});
