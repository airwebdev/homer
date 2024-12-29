/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import Data from './data.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment, useState, useEffect } = wp.element;
const { useAnchor, insertObject } = wp.richText;
const { Modal, Button, TextControl, SearchControl, Popover, ToolbarGroup, ToolbarDropdownMenu, TabPanel } = wp.components;
const { BlockControls, __experimentalPanelColorGradientSettings } = wp.blockEditor;

export default ({ name, value, isActive, activeObjectAttributes, isObjectActive, onChange, contentRef }) => {
    const [ characters, setCharacters ] = useState(Data.wordpress);
    const [ tab, setTab ] = useState('wordpress');
    const [ keyword, setKeyword ] = useState('');
    const [ popupOpened, setPopupOpened ] = useState(isActive);
	const { url, width, color, grad, transform } = activeObjectAttributes;
    const [ trans, setTrans ] = useState( transform ? transform : 0 );
    const [ icon, setIcon ] = useState( url ? url : "" );
	const [ size, setSize ] = useState( width ? width : parseFloat(getComputedStyle(contentRef.current, null).getPropertyValue('font-size') || 24 ) );
	const [ bg, setBg ] = useState( color ? color : 'currentColor' );
	const [ gradient, setGradient ] = useState( grad ? grad : '' );
    const anchor = contentRef ? useAnchor({ editableContentElement: contentRef.current, value }) : null;

    const srcUrl = name => {
        return homerdata.path + name;
    }
    
    const iconUrl = name => {
        return `${ homerdata.path }icons/${ name }.svg`;
    }
    
    useEffect(() => {
        url && setIcon(url)
    }, [ url ]);
    
    useEffect(() => {
        transform && setTrans(transform)
    }, [ transform ]);

    useEffect(() => {
        width && setSize(width);
    }, [ width ]);
    
    useEffect(() => {
        color && setBg(color)
    }, [ color ]);
    
    useEffect(() => {
        grad && setGradient(grad)
    }, [ grad ]);
    
    useEffect(() => {
        setPopupOpened(isActive);
    }, [ isActive ]);

    useEffect(() => {
        const newReplacements = value.replacements.slice();

        newReplacements[ value.start ] = {
            type: name,
            attributes: {
                ...activeObjectAttributes,
                src: srcUrl('images/icon.png'),
                url: icon,
                transform: trans.toString(),
                width: size.toString(),
                height: size.toString(),
                color: bg ? bg : '',
                grad: gradient ? gradient : '',
                style: `--image: url( ${ iconUrl(icon) } ); --bg: ${ gradient ? gradient : bg }; transform: translateY(${ trans.toString() }px)`,
            },
        };

        onChange( {
            ...value,
            replacements: newReplacements,
        } );
    }, [ size, bg, trans, gradient ]);
    

    const onSearch = (keyword) => {
        let filtered = {};

        map(Data[tab], (character, key) => {
            if (character && character.replaceAll('-', ' ').toLowerCase().search(keyword.toLowerCase()) !== -1) {
                filtered = Object.assign({ [key]: character }, filtered);
            }
        });

        setKeyword(keyword);
        setCharacters(filtered);
    }

    const onSelect = tab => {
        setTab(tab);
        const tabContent = typeof Data[tab] !== 'undefined' ? Data[tab] : {};
        setKeyword('');
        setCharacters(tabContent);
    };

    const closePopup = () => {
        setTab('wordpress');
        setPopupOpened(false);
    }
    const openPopup = () => setPopupOpened(true);

    let container = 'homer-chars-modal';

    if (keyword) {
        container += ' is-searching';
    }

    if (popupOpened) {
        return (
            <Modal
                className={container}
                title={__('Insert icon', homer.name)}
                closeLabel={__('Cancel')}
                onRequestClose={() => {
                    popupOpened && closePopup();
                }}
            >
                <SearchControl
                    value={keyword}
                    onChange={onSearch}
                />
                <TabPanel
                    className="homer-chars-tabpanel"
                    activeClass="is-active-tab"
                    onSelect={onSelect}
                    tabs={[
                        {
                            name: 'wordpress',
                            title: __('Wordpress', homer.name),
                            className: 'homer-chars-wp',
                        },
                        {
                            name: 'regular',
                            title: __('Font Awesome Regular', homer.name),
                            className: 'homer-chars-fa',
                        },
                        {
                            name: 'brand',
                            title: __('Font Awesome Brand', homer.name),
                            className: 'homer-chars-fa',
                        },
                        {
                            name: 'solid',
                            title: __('Font Awesome Solid', homer.name),
                            className: 'homer-chars-fa',
                        }
                    ]}
                >
                    {() => {
                        return (
                            <Fragment>
                                {Object.keys(characters).length > 0 ? (
                                    <ul className="homer-chars-list icons">
                                        {map(characters, (character, key) => {
                                            return (
                                                <li key={'homer-chars-' + key}>
                                                    <Button
                                                        isTertiary
                                                        disabled={ tab + '/' + character === icon }
                                                        onClick={() => {
                                                            setKeyword('');
                                                            setCharacters(Data.wordpress);
                                                            onChange(
                                                                insertObject( value, {
                                                                    type: name,
                                                                    attributes: {
                                                                        ...activeObjectAttributes,
                                                                        src: srcUrl('images/icon.png'),
                                                                        transform: trans.toString(),
                                                                        url: tab + '/' + character,
                                                                        width: size.toString(),
                                                                        height: size.toString(),
                                                                        color: bg ? bg : '',
                                                                        grad: gradient ? gradient : '',
                                                                        style: `--image: url( ${ iconUrl(tab + '/' + character) } ); --bg: ${ gradient ? gradient : bg }; transform: translateY(${ trans.toString() }px)`,
                                                                    },
                                                                } )
                                                            );
                                                            closePopup();
                                                        } }
                                                    >
                                                        <img src={ iconUrl(tab + '/' + character) } />
                                                        <label>{character ? character.replaceAll('-', ' ') : ''}</label>
                                                    </Button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p>{__('No icons found.', homer.name)}</p>
                                )}
                            </Fragment>
                        );
                    }}
                </TabPanel>
            </Modal>
        )
    }

    if (isObjectActive) {
        return (
            <Fragment>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={ homer.icons.icons }
                            label={__('Icon', homer.name)}
                            className="typewriter-toolbar-btn active"
                            controls={ [
                                {
                                    title: __('Icon: Edit', homer.name),
                                    icon: 'edit',
                                    onClick: openPopup,
                                }
                            ] }
                        />
                    </ToolbarGroup>
                </BlockControls>
                <Popover
                    className="homer-popover"
                    anchor={anchor}
                    focusOnMount={ false }
                    position="bottom center"
                >
                    <div className="homer-popover-controls icons">
                        <TextControl
                            className="block-editor-format-toolbar__image-container-value"
                            type="number"
                            label={ __( 'Size' ) }
                            value={ size }
                            min={ 1 }
                            onChange={ ( newsize ) =>  setSize( newsize ) }
                        />
                        <TextControl
                            className="block-editor-format-toolbar__image-container-value"
                            type="number"
                            label={ __( 'Vertical align' ) }
                            value={ trans }
                            min={ 1 }
                            onChange={ ( newsize ) =>  setTrans( newsize ) }
                        />
                        <__experimentalPanelColorGradientSettings
                            __experimentalHasMultipleOrigins
                            clearable={false} 
                            enableAlpha={true}
                            className="homer-popover-color-picker simple"
                            settings={[
                                {
                                    colorValue: bg,
                                    gradientValue: gradient,
                                    onColorChange: setBg,
                                    onGradientChange: setGradient,
                                },
                            ]}
                        />
                        <Button
                            icon="edit"
                            className='homer-button after-color'
                            onClick={openPopup}
                        />
                    </div>
                </Popover>
            </Fragment>
        )
    }

    return '';
};
