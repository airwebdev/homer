/**
* Text Animation Format
*
* Rich Text Format Control to create typewriter effect in editor.
*/

const { element } = require('prop-types');

const { registerFormatType, toggleFormat, applyFormat, useAnchor } = wp.richText;
const { BlockControls } = wp.blockEditor;
const { __ } = wp.i18n;
const { Fragment, useState, useEffect } = wp.element;
const { Popover, RangeControl, ToggleControl, ToolbarGroup, ToolbarDropdownMenu, Dropdown, Button } = wp.components;
const { makeid, startStopAnimationEvent, stopAnimationEvent } = homer.helpers;
const { HomerColorPicker } = homer.components;
const { select, dispatch } = wp.data;

/**
 * Global Vars
 *
 * Visible in all components
 */
const title = __('Text Animation', homer.name);
const type = homer.name + '/typewriter';
import SmallPopup from '../../small-popup';
window.homer.components.typewriter = true;

const closeIcon = (
    <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        focusable="false"
    >
        <path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path>
    </svg>
);

const styles = homer.animationsNames.map( value => (
    {
      animationStyleName: value,
      animationStyleEnabled: true,
      animanionsStyleIsFavourite: false,
    }
));

function checkWhichAnimationsAreAvailable() {
    wp.api.loadPromise.then( () => {
        const settings = new wp.api.models.Settings();
        settings.fetch().then(response => {
            homer.animationAvailableOptionsNames.map((value, index) => {
                styles[index].animationStyleEnabled = response[value] ? true : false
            })
            homer.animationIsFavouriteIconsNamesOptions.map((value, index) => {
                styles[index].animanionsStyleIsFavourite = ( response[value] === 'star-empty') ? false : true
            })
        })
    });
};
checkWhichAnimationsAreAvailable();

function createAnimationStyleButtons(stylesArray, activeStyle, changeStyle, options) {
    const result = [];

    if (options.action === 'hover') {
        stylesArray[0].animationStyleEnabled = false;
        stylesArray[1].animationStyleEnabled = false;
    };

    const existsAtLeastOneAvailableButNotFavourite = stylesArray.map( el =>
        (el.animationStyleEnabled === true && el.animanionsStyleIsFavourite === false) ? true : false
    ).some( el => el === true);
    const existsAtLeastOneAvailableAndFavourite = stylesArray.map( el =>
        (el.animationStyleEnabled === true && el.animanionsStyleIsFavourite === true) ? true : false
    ).some( el => el === true);
    const enabledEmpty = stylesArray.every( element => element.animationStyleEnabled === false);

    function buildDiv(whichDiv) {
        return(
            stylesArray.map((value, index) => {
                const position = '' + ++index;
                const { animationStyleName, animationStyleEnabled, animanionsStyleIsFavourite } = value;
                    if ( (whichDiv === 'favourites') && animationStyleEnabled && animanionsStyleIsFavourite) {
                        return (
                            buildButton(position, animationStyleName)
                        )
                    }
                    if ( ((whichDiv === 'others') || (whichDiv === 'all enabled')) && animationStyleEnabled && !animanionsStyleIsFavourite ) {
                        return (
                            buildButton(position, animationStyleName)
                        )
                    }
            })
        )
    };

    function buildButton(position, animationStyleName) {
        return (
            <button
                onClick={() => changeStyle(position)}
                className={
                    activeStyle == position
                        ? 'typewriter-popover-style active'
                        : 'typewriter-popover-style'
                }
                key={position}
                aria-label={__('Choose style', homer.name)}
            >
                {animationStyleName}
            </button>
        )
    }  

    if ( enabledEmpty ) {
        result.push(
            <div className="typewriter-popover-style-empty-list">
                <span>{__('You have to enable at least one animation style.', homer.name)}</span><br/>
                <span>{__('("Wipe" and "Typewriter" are not available in "Hover" mode.)', homer.name)}</span>
            </div>
        )
    } else {
        if (existsAtLeastOneAvailableAndFavourite) {
            result.push(
                < div className="typewriter-popover-style-list" style={{ marginBottom: 7 + 'px' }}>
                    <div style={{ marginBottom: 7 + 'px' }}><span>{__('Favourite Styles', homer.name)}</span></div>
                    {buildDiv('favourites')}
                </div>
            )
            if (existsAtLeastOneAvailableButNotFavourite) {
                result.push(
                    < div className="typewriter-popover-style-list">
                        <div style={{ marginBottom: 7 + 'px' }}><span>{__('Other Styles', homer.name)}</span></div>
                        {buildDiv('others')}
                    </div>
                )
            }
        } else {
            result.push(
                < div className="typewriter-popover-style-list">
                    {buildDiv('all enabled')}
                </div>
            )
        }
    };
    return result;
};

const HomerTextAnimationFormat = props => {
    /**
     * Format Vars
     *
     * Not visible in child components
     */
    const { isActive, value, onChange, activeAttributes, contentRef } = props;
    const [currentElemId, setCurrentElemId] = useState(null);
    const [popupOpened, setPopupOpened] = useState(false); // Boolean

    const defaultOptions = {
        speed: 5,
        delay: 2.5,
        startDelay: 0,
        loop: false,
        visibleStart: false,
        spaceStart: false,
        cursor: false,
        cursorBlink: false,
        cursorType: '|',
        fulldWidth: false,
        timeline: false,
        timelineColor: 'black',
        cursorColor: 'inherit',
        action: 'time',
    };
    const anchor = useAnchor({ editableContentElement: contentRef.current, value, settings: {
        name: type,
        tagName: 'span',
        className: 'homer-typewriter',
    } });

    /**
     * Initial Toggle
     */
    const onToggle = () => {
        const id = makeid();
        onChange(
            toggleFormat(value, {
                type: type,
                attributes: {
                    settings: JSON.stringify(defaultOptions),
                    result: '',
                    id: id,
                    style: '1',
                },
            }),
        );
        setPopupOpened(false);
        startStopAnimationEvent(document.getElementById(id));
    };

    /**
     * Change duplicated id
     */
    const reApply = () => {
        const id = makeid();
        onChange(
            applyFormat(value, {
                type: type,
                attributes: {
                    settings: activeAttributes.settings,
                    result: activeAttributes.result,
                    id: id,
                    style: activeAttributes.style,
                },
            }),
        );
        setPopupOpened(true);
        startStopAnimationEvent(document.getElementById(id));
    };

    /**
     * Save new values to DOM tag
     */
    const sendValues = (values, style, options) => {
        const input = document.querySelector('.typewriter-popover-input-group:last-child input');

        const saveValues =
            values.length &&
            values.filter(value => {
                return value.value;
            });
        const result = saveValues.length ? JSON.stringify(saveValues) : '';
        const settings = JSON.stringify(options);
        const full = options.fullWidth ? 'fullwidth' : '';

        onChange(
            applyFormat(value, {
                type: type,
                attributes: {
                    class: full,
                    settings: settings,
                    result: result,
                    style: style,
                    id: currentElemId,
                },
            }),
        );

        if ( input ) {
            const { selectionStart, selectionEnd } = input;
            input.setSelectionRange(selectionStart, selectionEnd);
        }

    };

    const togglePopup = () => {
        setPopupOpened(!popupOpened);
    };
    
    const openPopup = () => {
        setPopupOpened(true);
    };


    /**
     * Get current formatted element
     */
    const getCurrentElement = () => {
        let elem = document.getElementById(currentElemId);
        if (!elem) {
            const iframe = document.querySelector('[name=editor-canvas');
            const iframeDocument = iframe && (iframe.contentDocument || iframe.contentWindow.document);
            elem = iframeDocument ? iframeDocument.getElementById(currentElemId) : '';
        }
        return elem;
    };

    /**
     * Find Current Text Animation id to rebuild Popup
     *
     * Yes, Popup is only one on the page
     */
    useEffect(() => {
        const id = getCurrentId(props);
        id !== -1 && setCurrentElemId(getCurrentId(props));
        id === -1 && reApply();
    }, [value.activeFormats]);

    return (
        isActive ? (
            <Fragment>
                {(
                    // Checks if animations are turned on on sidebar
                    checkWhichAnimationsAreAvailable()
                )}

                {popupOpened && currentElemId && (
                    <MainPopup {...{ getCurrentElement, activeAttributes, sendValues, anchor, togglePopup }} />
                )}
                {!popupOpened && currentElemId && (
                    <SmallPopup {...{ onToggle, anchor, openPopup } } name={ __("Text animation", homer.name)} />
                )}
                <PanelButton {...{ onToggle, openPopup }} />
            </Fragment>
        ) : ''
    )
};

const MainPopup = ({ anchor, getCurrentElement, popupOpened, activeAttributes, sendValues, togglePopup }) => {

    /**
     * Reactive Popup states
     */
    const [values, setValues] = useState(['']); // Array with empty value to store first input on init
    const [activeStyle, setActiveStyle] = useState('1'); // String
    const [options, setOptions] = useState([]); // Array

    /**
     * Restart Button - Restart Animation
     */
    const onRestart = () => {
        sendAllValues();
        startStopAnimationEvent(getCurrentElement());
    };

    const closePopup = () => {
        onRestart();
        togglePopup();
    };

    /**
     * Send All Saved Values
     */
    const sendAllValues = () => {
        sendValues(values, activeStyle, options);
    };

    /**
     * Apply changes after small delay
     */
    const applyChanges = (values, style, options, restart) => {
        window.homertypetimer && clearTimeout(window.homertypetimer);
        window.homertypetimer = setTimeout(() => {
            sendValues(values, style, options);
        }, 400);
    };

    /**
     * Add new input if no epmty inputs
     */
    const addNew = () => {
        const empty = values.some(value => {
            return value && value.value && value.value.length == 0;
        });
        !empty && setValues(values.concat({ value: '' }));
        !empty && applyChanges(values, activeStyle, options, true);

        const input = document.querySelector('.typewriter-popover-input-group:last-child input');
        input && values.length && input.focus();
    };

    /**
     * Change styles
     */
    const changeStyle = style => {
        setActiveStyle(style);
        applyChanges(values, style, options, true);
    };

    /**
     * Remove input
     */
    const onRemove = index => e => {
        let temp = [...values];
        temp.splice(index, 1);
        setValues(temp);
        applyChanges(temp, activeStyle, options, true);
    };

    /**
     * Input change value
     */
    const inputChange = index => value => {
        let temp = [...values];
        temp[index] = value;
        setValues(temp);
    };

    /**
     * Chnage settings
     */
    const changeOptions = options => {
        setOptions(options);
        applyChanges(values, activeStyle, options, true);
    };

    /**
     * Parse settings stored in DOM main tag attribute into Popup state
     */
    useEffect(() => {
        setActiveStyle(activeAttributes.style ? activeAttributes.style : '1');
        setValues(activeAttributes.result ? JSON.parse(activeAttributes.result) : ['']);
        setOptions(activeAttributes.settings ? JSON.parse(activeAttributes.settings) : '');
    }, [popupOpened]);

    /**
     * Focus on the last input [ Triggers: "+" click, "input" Enter, Popup re-mount ]
     */
    useEffect(() => {
        const input = document.querySelector('.typewriter-popover-input-group:last-child input');
        setTimeout(() => {
            input && values.length && input.focus();
        }, 0)
    }, [values.length]);

    return (
        <Popover
            anchor={anchor}
            className="typewriter-popover"
            placement="bottom-start"
            key="typewriter-popover"
            headerTitle={__('Text Animation Customizing', homer.name)}
        >
            <div className="typewriter-popover-main">
                <NewValues {...{ values, inputChange, onRemove, addNew }} />
                <ChangeStyles {...{ changeStyle, activeStyle, options }} />
                <TypeSettings2
                    {...{
                        options,
                        changeOptions,
                        activeStyle,
                    }}
                />
            </div>
            <div className="typewriter-popover-side">
                <TypeSettings
                    {...{
                        onRestart,
                        closePopup,
                        options,
                        changeOptions,
                        getCurrentElement
                    }}
                />
            </div>
        </Popover>
    );
};

const NewValues = ({ values, inputChange, onRemove, addNew }) => {
    return (
        <div>
            <div className="typewriter-popover-title-wrapper">
                <h2 className="typewriter-popover-title">{__('Text values', homer.name)}</h2>
                <button
                    onClick={addNew}
                    className="typewriter-popover-btn new-value"
                    aria-label={__('Add new item', homer.name)}
                    title={__('Add new item', homer.name)}
                >
                    <span class="dashicons dashicons-insert"></span>
                </button>
            </div>
            <div className="typewriter-popover-values">
                {/* <BasicValue {...{ value, changeMainValue, addNew }} /> */}
                {values.length
                    ? values.map((value, index) => (
                        <NewValue
                            {...{ value, addNew }}
                            onRemove={onRemove(index)}
                            onChange={inputChange(index)}
                            key={index}
                        />
                    ))
                    : ''}
            </div>
        </div>
    );
};

const ChangeStyles = ({ changeStyle, activeStyle, options }) => {
    /**
     * Replace style if hover
     */
    useEffect(() => {
        if (options.action == 'hover' && (activeStyle == '1' || activeStyle == '2')) {
            changeStyle('3');
        }
    }, [options.action]);

    function openHomerSidebar() {
        const sidebarName = select('core/edit-post').getActiveGeneralSidebarName();
        switch(sidebarName) {
            case 'homer/homer-sidebar':
                dispatch('core/edit-post').closeGeneralSidebar('homer/homer-sidebar');
                break;
            case null:
                dispatch('core/edit-post').openGeneralSidebar('homer/homer-sidebar');
                break;
            default:
                dispatch('core/edit-post').closeGeneralSidebar();
                dispatch('core/edit-post').openGeneralSidebar('homer/homer-sidebar');
        }
    };

    return (
        <div>
            <div className="typewriter-popover-title-wrapper">
                <h2 className="typewriter-popover-title">{__('Animations', homer.name)}</h2>
                <button
                    onClick={openHomerSidebar}
                    className="typewriter-popover-btn settings"
                    aria-label={__('Animations settings', homer.name)}
                    title={__('Open more animations settings', homer.name)}
                >
                    <span class="dashicons dashicons-admin-generic"></span>
                </button>
            </div>
            <Dropdown
                renderToggle={({ isOpen, onToggle }) => (
                    <Button
                        onClick={onToggle}
                        aria-expanded={isOpen}
                        variant={'secondary'}
                    >
                        {__('Select an animation style', homer.name)}
                    </Button>
                )}
                renderContent = {() => (
                    <div class="typewriter-popover-style-main-div">
                        {createAnimationStyleButtons(styles, activeStyle ,changeStyle, options).map(element => {
                            return element;
                        })}
                    </div>
                )}
            />
        </div >
    );
};

const TypeSettings = ({ onRestart, options, changeOptions, closePopup, getCurrentElement }) => {
    const {
        speed,
        delay,
        startDelay,
        action,
    } = options;
    const timeOption = action === 'time';

    return (
        <Fragment>
            <div className="typewriter-popover-title-wrapper">
                <h2 className="typewriter-popover-title">{__('Settings', homer.name)}</h2>
                <div className="typewriter-popover-btn-wrapper">
                    <button
                        onClick={onRestart}
                        className="typewriter-popover-btn restart"
                        title={__('Restart animation', homer.name)}
                        aria-label={__('Restart animation', homer.name)}
                    >
                        <span class="dashicons dashicons-controls-repeat"></span> {__('Restart', homer.name)}
                    </button>
                    <button
                        onClick={closePopup}
                        className="typewriter-popover-btn close"
                        title={__('Close popup', homer.name)}
                        aria-label={__('Close popup', homer.name)}
                    >
                        {closeIcon}
                    </button>
                </div>
            </div>
            <div className="typewriter-popover-settings-column-wrapper">
                <div className="typewriter-popover-settings-column">
                    <ActionControl action={action} onChange={action => changeOptions({ ...options, action })} />
                    <RangeControl
                        label={__('Animation speed', homer.name)}
                        value={speed}
                        onChange={speed => changeOptions({ ...options, speed })}
                        min={1}
                        max={8}
                    />
                    {timeOption && (
                        <RangeControl
                            label={__('Start delay', homer.name)}
                            value={startDelay}
                            onChange={startDelay => changeOptions({ ...options, startDelay })}
                            step={0.5}
                            min={0}
                            max={10}
                        />
                    )}
                    {timeOption && (
                        <RangeControl
                            label={__('Items delay', homer.name)}
                            value={delay}
                            onChange={delay => changeOptions({ ...options, delay })}
                            step={0.5}
                            min={0}
                            max={10}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

const TypeSettings2 = ({ options, changeOptions, activeStyle }) => {
    const {
        loop,
        fullWidth,
        visibleStart,
        timeline,
        timelineColor,
        cursorColor,
        cursor,
        cursorType,
        cursorBlink,
        action,
    } = options;
    const timeOption = action === 'time';

    return (
        <Fragment>
            <div className="typewriter-popover-settings-column-wrapper">
                <div className="typewriter-popover-settings-column">
                    {timeOption && (
                        <ToggleControl
                            label={__('Repeatable', homer.name)}
                            checked={loop}
                            onChange={loop => changeOptions({ ...options, loop })}
                        />
                    )}
                    {timeOption && (
                        <ToggleControl
                            label={__('Visible on start', homer.name)}
                            checked={visibleStart}
                            onChange={visibleStart => changeOptions({ ...options, visibleStart })}
                        />
                    )}
                    {/* {timeOption && !visibleStart && (
                        <ToggleControl
                            label={__('Keep space on start', homer.name)}
                            checked={spaceStart}
                            onChange={spaceStart => changeOptions({ ...options, spaceStart })}
                        />
                    )} */}
                    <div className="typewriter-popover-settings-section">
                        {(activeStyle == '1' || activeStyle == '2') && timeOption && (
                            <ToggleControl
                                label={__('Cursor', homer.name)}
                                checked={cursor}
                                onChange={cursor => changeOptions({ ...options, cursor })}
                            />
                        )}
                        {(activeStyle == '1' || activeStyle == '2') && timeOption && cursor && (
                            <input
                                value={cursorType}
                                className="typewriter-popover-input-border"
                                onChange={e => changeOptions({ ...options, cursorType: e.target.value })}
                            />
                        )}
                        {(activeStyle == '1' || activeStyle == '2') && timeOption && cursor && (
                            <HomerColorPicker
                                color={cursorColor}
                                onChange={cursorColor => changeOptions({ ...options, cursorColor })}
                            />
                        )}
                    </div>
                    {(activeStyle == '1' || activeStyle == '2') && timeOption && cursor && (
                        <ToggleControl
                            label={__('Blink Cursor', homer.name)}
                            checked={cursorBlink}
                            onChange={cursorBlink => changeOptions({ ...options, cursorBlink })}
                        />
                    )}
                    <div className="typewriter-popover-settings-section">
                        {activeStyle != '2' && timeOption && (
                            <ToggleControl
                                label={__('Timeline', homer.name)}
                                checked={timeline}
                                onChange={timeline => changeOptions({ ...options, timeline })}
                            />
                        )}
                        {activeStyle != '2' && timeOption && timeline && (
                            <HomerColorPicker
                                color={timelineColor}
                                onChange={timelineColor => changeOptions({ ...options, timelineColor })}
                            />
                        )}
                    </div>
                    {timeOption && (
                        <ToggleControl
                            label={__('Full width', homer.name)}
                            checked={fullWidth}
                            onChange={fullWidth => changeOptions({ ...options, fullWidth })}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

const NewValue = ({ value, onChange, onRemove, addNew, onFocus, onBlur }) => {
    const _handleKeyDown = e => {
        if (e.key === 'Enter') addNew();
    };

    const changeValue = e => {
        onChange({ value: e.target.value, color: value.color });
    };

    const colorChange = color => {
        onChange({ value: value.value, color: color });
    };

    return (
        <div className="typewriter-popover-input-group">
            <HomerColorPicker color={value.color} onChange={colorChange} />

            <input
                onKeyDown={_handleKeyDown}
                className="typewriter-popover-input"
                value={value.value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={changeValue}
                placeholder={__('Add New Value', homer.name)}
            />
            <button
                onClick={(onRemove)}
                type="button"
                class="components-button typewriter-popover-input-remove"
                aria-label="Remove item"
            >
                {closeIcon}
            </button>
        </div>
    );
};

const ActionControl = ({ action, onChange }) => {
    const changeValue = e => {
        onChange(e.target.value);
    };

    return (
        <div className="actions-wrapper">
            <span className="actions-label">{__('Action:', homer.name)}</span>
            <select class="typewriter-btn-control" onChange={changeValue}>
                <option value="time" selected={action == 'time'}>
                    {__('Time', homer.name)}
                </option>
                <option value="hover" selected={action == 'hover'}>
                    {__('Hover', homer.name)}
                </option>
            </select>
        </div>
    );
};

const PanelButton = ({ onToggle, openPopup }) => {
    const controls = [ 
        {
            title: __('Text Animation: Edit', homer.name),
            icon: 'edit',
            onClick: openPopup
        }, 
        {
            title: __('Text Animation: Remove', homer.name),
            icon: 'trash',
            onClick: onToggle,
        }
    ];

    return (
        <Fragment>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarDropdownMenu
                        icon={ homer.icons.typeIcon }
                        label={__('Text Animation', homer.name)}
                        className="typewriter-toolbar-btn active"
                        controls={ controls }
                    />
                </ToolbarGroup>
            </BlockControls>
        </Fragment>
    );
};

const getCurrentId = props => {
    const typewriter =
        props.value &&
        props.value.activeFormats &&
        props.value.activeFormats.filter(format => {
            return format.type == type;
        });
    let id =
        typewriter && typewriter.length && typewriter[0].unregisteredAttributes
            ? typewriter[0].unregisteredAttributes.id
            : null;
    id = !id && typewriter && typewriter.length && typewriter[0].attributes ? typewriter[0].attributes.id : id;
    const nodes = id && document.querySelectorAll('[id="' + id + '"]');

    return id && nodes.length > 1 ? -1 : id;
};

registerFormatType(type, {
    title: title,
    tagName: 'span',
    className: 'homer-typewriter',
    attributes: {
        class: 'class',
        settings: 'data-settings',
        result: 'data-values',
        style: 'data-style',
        id: 'id',
    },
    edit: HomerTextAnimationFormat,
});
