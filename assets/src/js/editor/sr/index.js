/**
 * Internal dependencies
 */
import '../../../scss/editor/srEditor.scss';
import '../../../scss/frontend/sr.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerFormatType } = wp.richText;
const { BlockControls } = wp.blockEditor;
const { toggleFormat } = wp.richText;
const { ToolbarGroup, ToolbarDropdownMenu } = wp.components;

const name = homer.name + '/sr';
window.homer.components.sr = true;

/**
 * Register Format
 */
registerFormatType(name, {
    title: __('Screen readers / visually hidden', homer.name),
    tagName: 'span',
    className: 'homer-sr',
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
                                icon={ homer.icons.sr }
                                label={__('Screen readers / visually hidden', homer.name)}
                                className="typewriter-toolbar-btn active"
                                controls={ [
                                    {
                                        title: __('Screen readers: Remove', homer.name),
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
