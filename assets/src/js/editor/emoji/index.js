/**
 * Internal dependencies
 */
import CharacterMap from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerFormatType } = wp.richText;

/**
 * Block constants
 */
const name = homer.name + '/emoji';
window.homer.components.emoji = true;

registerFormatType(name, {
    name,
    title: __('Emoji', homer.name),
    tagName: 'span',
    className: 'homer-emoji',
    edit({ isActive, value, onChange, activeAttributes }) {
        return (
            <Fragment>
                <CharacterMap
                    name={name}
                    isActive={isActive}
                    value={value}
                    onChange={onChange}
                    activeAttributes={activeAttributes}
                />
            </Fragment>
        );
    },
});
