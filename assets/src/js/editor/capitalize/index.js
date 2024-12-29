/**
 * Internal dependencies
 */
import '../../../scss/frontend/capitalize.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerFormatType } = wp.richText;
const { BlockControls } = wp.blockEditor;
const { toggleFormat } = wp.richText;
const { ToolbarGroup, ToolbarDropdownMenu } = wp.components;

const name = homer.name + '/capitalize';
window.homer.components.capitalize = true;

/**
 * Register Format
 */
registerFormatType(name, {
    title: __('Capitalize', homer.name),
    tagName: 'span',
    className: 'homer-capitalize',
    edit({ isActive, value, onChange }) {

        const onToggle = () => {
            onChange(
                toggleFormat(value, {
                    type: name,
                }),
            );
        };

        return (
            <Fragment>
                {isActive && (
                    <BlockControls>
                        <ToolbarGroup>
                            <ToolbarDropdownMenu
                                icon={ homer.icons.capitalize }
                                label={__('Capitalize', homer.name)}
                                className="typewriter-toolbar-btn active"
                                controls={ [
                                    {
                                        title: __('Capitalize: Remove', homer.name),
                                        icon: 'trash',
                                        onClick: onToggle,
                                    }
                                ] }
                            />
                        </ToolbarGroup>
                    </BlockControls>
                )}
            </Fragment>
        );
    },
});
