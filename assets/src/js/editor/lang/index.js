/**
 * Internal dependencies
 */
import LangMap from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerFormatType } = wp.richText;

/**
 * Block constants
 */
const name = homer.name + '/lang';
window.homer.components.lang = true;

registerFormatType(name, {
    title: __('Lang attribute', homer.name),
    tagName: 'span',
    className: 'homer-lang',
    attributes: {
        lang: 'lang',
    },
    edit({ isActive, value, onChange, activeAttributes, contentRef }) {

        return (
            <Fragment>
                <LangMap
                    name={name}
                    isActive={isActive}
                    value={value}
                    contentRef={contentRef}
                    onChange={onChange}
                    activeAttributes={activeAttributes}
                />
            </Fragment>
        );
    },
});
