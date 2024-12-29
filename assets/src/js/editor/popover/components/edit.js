const { toggleFormat, applyFormat, useAnchor } = wp.richText;
const { Fragment, useState, useEffect } = wp.element;
const { __ } = wp.i18n;

import PanelButton from './button';
import Popup from './popup';
import SmallPopup from '../../../small-popup';

const formatName = homer.name + '/popover';

export default ({ isActive, value, onChange, contentRef, activeAttributes }) => {
    const [text, setText] = useState(activeAttributes.text ? activeAttributes.text : '');
    const [fz, setFz] = useState(activeAttributes.fz ? activeAttributes.fz : 14);
    const [popupOpened, setPopupOpened] = useState(false);
    const anchor = useAnchor({ editableContentElement: contentRef.current, value, settings: {
        tagName: 'span', 
        className: 'homer-popover',
        name: formatName
    } });

    useEffect(() => {
        isActive && activeAttributes.text && setText(activeAttributes.text);
        isActive && activeAttributes.fz && setFz(activeAttributes.fz);
    }, [activeAttributes]);


    useEffect(() => {
        if (popupOpened) {
            reApply(true);
            closePopup();
        } 
    }, [text, fz]);

    const onToggle = () => {
        onChange(
            toggleFormat(value, {
                type: formatName
            }),
        );
    };

    const openPopup = () => setPopupOpened(true);
    
    const closePopup = () => {
        setPopupOpened(false);
    }

    const reApply = () => {
        onChange(
            applyFormat(value, {
                type: formatName,
                attributes: {
                    text: text,
                    fz: fz.toString(),
                    style: `--font-size: ${fz}px;`,
                },
            }),
        );
    };

    return (
        <Fragment>
            {isActive ? (
                <Fragment>
                    <PanelButton {...{ onToggle, openPopup }} />
                    { popupOpened ? 
                        <Popup {...{ text, setText, fz, setFz, anchor, closePopup }} /> : 
                        <SmallPopup {...{ onToggle, anchor, openPopup } } name={ __('Popover', homer.name ) } />
                    }
                </Fragment>
            ) : ''}
        </Fragment>
    );
};
