/**
 * Internal dependencies
 */
import '../../../scss/frontend/uppercase.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerFormatType } = wp.richText;
const { BlockControls } = wp.blockEditor;
const { toggleFormat } = wp.richText;
const { ToolbarGroup, ToolbarDropdownMenu } = wp.components;
const { select } = wp.data;

const name = homer.name + '/uppercase';
window.homer.components.uppercase = true;

/**
 * Register Format
 */
registerFormatType(name, {
    title: __('Uppercase', homer.name),
    tagName: 'span',
    className: 'homer-uppercase',
    edit({ isActive, value, onChange }) {
        const isDisabled = select('core/edit-post').isFeatureActive('homer_uppercase_disabled');

        const onToggle = () => {
            onChange(
                toggleFormat(value, {
                    type: name,
                }),
            );
        };

        return (
            !isDisabled && (
                <Fragment Fragment>
                    {isActive && (
                        <BlockControls>
                            <ToolbarGroup>
                                <ToolbarDropdownMenu
                                    icon={ homer.icons.uppercase }
                                    label={__('Uppercase', homer.name)}
                                    className="typewriter-toolbar-btn active"
                                    controls={ [
                                        {
                                            title: __('Uppercase: Remove', homer.name),
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
