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
const name = homer.name + '/specialchars';
window.homer.components.chars = true;

registerFormatType(name, {
    name,
    title: __('Special Characters', homer.name),
    tagName: 'span',
    className: 'homer-special-chars',
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
