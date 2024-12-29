/**
 *
 * Hidden Text / Spoiler Format
 *
 */

/**
 * Import editor files
 */
const { __ } = wp.i18n;
const { registerFormatType } = wp.richText;

import edit from './components/edit';
import '../../../scss/editor/spoilerEditor.scss';
window.homer.components.spoiler = true;

/**
 * Startin point - Init wp text format
 */
registerFormatType(homer.name + '/spoiler', {
    title: __('Hidden Text / Spoiler', homer.name),
    tagName: 'span',
    className: 'homer-spoiler',
    attributes: {
        text: 'data-text',
        color: 'data-color',
        underline: 'data-underline',
        style: 'style',
    },
    edit: edit,
});
