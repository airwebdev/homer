/**
 * External dependencies
 */
import { map, upperFirst } from 'lodash';

/**
 * Internal dependencies
 */
import Data from './data.json';
import SmallPopup from '../../small-popup';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment, useState, useEffect } = wp.element;
const { toggleFormat, useAnchor, applyFormat } = wp.richText;
const { Modal, Button, TextControl } = wp.components;
const { BlockControls } = wp.blockEditor;
const { ToolbarGroup, ToolbarDropdownMenu } = wp.components;

export default props => {
    const { name, value, isActive, onChange, contentRef } = props;
    const [ characters, setCharacters ] = useState(Data.default);
    const [ keyword, setKeyword ] = useState('');
    const [ popupOpened, setPopupOpened ] = useState(false);
    const [ lang, setLang ] = useState('');
    const anchor = useAnchor({ editableContentElement: contentRef.current, value });

    useEffect(() => {
        if (isActive) {
            const langFormat = value.activeFormats.filter(item => {
                return item.type === "homer/lang"
            });

            if (langFormat && langFormat.length && langFormat[0].attributes) {
                const langCode = langFormat[0].attributes.lang;
                const char = langCode && characters.length && characters.filter(item => {
                    return item.char === langCode;
                });
                char && char.length && setLang(char[0].name);
            } else {
                setPopupOpened(true);
            }
        }
    }, [isActive]);
    

    const onSearch = (keyword) => {
        let filtered = {};

        map(Data, characters => {
            map(characters, (character, key) => {
                if (character.name.toLowerCase().search(keyword.toLowerCase()) !== -1) {
                    filtered = Object.assign({ [key]: character }, filtered);
                }
            });
        });

        setKeyword(keyword);
        setCharacters(filtered);
    }

    const onModify = (lang) => {
        setLang(lang.name);
        onChange(
            applyFormat(value, {
                type: name,
                attributes: {
                    lang: lang ? lang.char : 'en'
                },
            }),
        );
        togglePopup();
    }

    const onToggle = () => {
        setKeyword('');
        setLang('');
        togglePopup();

        onChange(
            toggleFormat(value, {
                type: name,
                attributes: {
                    lang: lang ? lang : 'en'
                },
            }),
        );
    };

    const togglePopup = () => setPopupOpened(!popupOpened);
    const openPopup = () => setPopupOpened(true);

    if (isActive) {
        return (
            <Fragment>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={ homer.icons.lang }
                            label={__('Lang attribute', homer.name)}
                            className="typewriter-toolbar-btn active"
                            controls={ [
                                {
                                    title: __('Lang attribute: Edit', homer.name),
                                    icon: 'edit',
                                    onClick: togglePopup,
                                },
                                {
                                    title: __('Lang attribute: Remove', homer.name),
                                    icon: 'trash',
                                    onClick: onToggle,
                                }
                            ] }
                        />
                    </ToolbarGroup>
                </BlockControls>
                { popupOpened ? (
                    <Modal
                        title={__('Change text language', homer.name)}
                        closeLabel={__('Cancel')}
                        onRequestClose={togglePopup}
                    >
                        <TextControl
                            value={keyword}
                            placeholder={__('Search', homer.name)}
                            onChange={newKeyword => {
                                onSearch(newKeyword);
                            }}
                        />
                        <Fragment>
                            {Object.keys(characters).length > 0 ? (
                                <ul className="homer-lang-list">
                                    {map(characters, (character, key) => {
                                        return (
                                            <li key={'homer-chars-' + key}>
                                                <Button
                                                    isTertiary={character.name !== lang}
                                                    disabled={character.name === lang}
                                                    onClick={() => onModify(character) }
                                                >
                                                    {character.name}
                                                </Button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p>{__('No characters found.', homer.name)}</p>
                            )}
                        </Fragment>
                    </Modal>
                ) : <SmallPopup {...{ onToggle, anchor, openPopup } } name={lang} />
                }
            </Fragment>
        );
    }

    return '';
};
