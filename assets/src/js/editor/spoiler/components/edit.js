const { toggleFormat, applyFormat, useAnchor } = wp.richText;
const { Fragment, useState, useEffect } = wp.element;

import PanelButton from './button';
import Popup from './popup';

const formatName = homer.name + '/spoiler';

export default props => {
    const { isActive, value, onChange, contentRef, activeAttributes } = props;
    const [text, setText] = useState(activeAttributes.text ? activeAttributes.text : 'show more...');
    const [color, setColor] = useState(activeAttributes.color ? activeAttributes.color : '#000');
    const [underline, setUnderline] = useState(activeAttributes.underline ? activeAttributes.underline : 'true');
    const anchor = useAnchor({ editableContentElement: contentRef.current, value, settings: {
        tagName: 'span', 
        className: 'homer-spoiler',
        name: formatName
    } });
    const fontSize = contentRef.current && parseFloat(getComputedStyle(contentRef.current, null).getPropertyValue('font-size') || 24 );

    useEffect(() => {
        isActive && reApply();
    }, [text, color, underline]);
    useEffect(() => {
        isActive && activeAttributes.text && setText(activeAttributes.text);
        isActive && activeAttributes.color && setColor(activeAttributes.color);
        isActive && activeAttributes.underline && setUnderline(activeAttributes.underline);
    }, [activeAttributes]);

    const onToggle = () => {
        onChange(
            toggleFormat(value, {
                type: formatName,
            }),
        );
    };

    const reApply = () => {
        onChange(
            applyFormat(value, {
                type: formatName,
                attributes: {
                    text: text,
                    color: color,
                    underline: underline,
                    style: `--font-size: ${fontSize}px; --color: ${color}`,
                },
            }),
        );
    };

    return (
        <Fragment>
            <PanelButton {...{ onToggle, isActive }} />
            {isActive && (
                <Popup {...{ text, setText, color, setColor, underline, setUnderline, anchor, onToggle }} />
            )}
        </Fragment>
    );
};
