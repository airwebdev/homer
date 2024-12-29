/**
 * Internal dependencies
 */
import '../../../scss/frontend/lowercase.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerFormatType } = wp.richText;
const { BlockControls } = wp.blockEditor;
const { toggleFormat } = wp.richText;
const { ToolbarGroup, ToolbarDropdownMenu } = wp.components;

const name = homer.name + '/lowercase';
window.homer.components.lowercase = true;

/**
 * Register Format
 */
registerFormatType(name, {
    title: __('Lowercase', homer.name),
    tagName: 'span',
    className: 'homer-lowercase',
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
                                icon={ homer.icons.lowercase }
                                label={__('Lowercase', homer.name)}
                                className="typewriter-toolbar-btn active"
                                controls={ [
                                    {
                                        title: __('Lowercase: Remove', homer.name),
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
