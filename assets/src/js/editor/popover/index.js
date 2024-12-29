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
import '../../../scss/editor/popoverEditor.scss';
import '../../../scss/frontend/popover.scss';
window.homer.components.popover = true;

/**
 * Startin point - Init wp text format
 */
registerFormatType(homer.name + '/popover', {
    title: __('Popover', homer.name),
    tagName: 'span',
    className: 'homer-popover',
    attributes: {
        text: 'data-text',
        fz: 'data-fz',
        style: 'style',
    },
    edit: edit,
});
