/**
 * Internal dependencies
 */
import CharacterMap from './controls';
import '../../../scss/frontend/icons.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerFormatType } = wp.richText;

/**
 * Block constants
 */
const name = homer.name + '/icons';
window.homer.components.icons = true;

registerFormatType(name, {
    name,
    title: __('Icons', homer.name),
    tagName: 'img',
    object: true,
    className: 'homer-icons',
    attributes: {
        className: 'class',
		style: 'style',
        src: 'src',
        url: 'data-src',
        transform: 'data-transform',
        width: 'width',
        height: 'height',
        color: 'data-color',
        grad: 'data-grad',
	},
    edit({ isActive, isObjectActive, value, onChange, activeAttributes, contentRef, activeObjectAttributes }) {
        return (
            <Fragment>
                <CharacterMap
                    {...{ isActive, isObjectActive, value, onChange, activeAttributes, contentRef, activeObjectAttributes }}
                    name={name}
                />
            </Fragment>
        );
    },
});
