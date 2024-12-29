/**
 * External dependencies
 */
import { map, upperFirst } from 'lodash';

/**
 * Internal dependencies
 */
import Chars from './characters.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment, useState } = wp.element;
const { toggleFormat, insert } = wp.richText;
const { Modal, TabPanel, Button, SearchControl, Tooltip } = wp.components;

const Specialchars = props => {
    const [characters, setCharacters] = useState(Chars.Smileys);
    const [keyword, setKeyword] = useState('');
    const { name, value, isActive, onChange } = props;

    const onSearch = keyword => {
        let filtered = {};

        map(Chars, characters => {
            map(characters, (character, key) => {
                if (character.name && character.name.toLowerCase().search(keyword.toLowerCase()) !== -1) {
                    filtered = Object.assign({ [key]: character }, filtered);
                }
            });
        });

        setKeyword(keyword);
        setCharacters(filtered);
    }


    const onSelect = tab => {
        const tabContent = typeof Chars[tab] !== 'undefined' ? Chars[tab] : {};
        setKeyword('');
        setCharacters(tabContent);
    };

    let container = 'homer-chars-modal';

    if (keyword) {
        container += ' is-searching';
    }

    if (isActive) {
        return (
            <Modal
                className={container}
                title={__('Insert Emoji', homer.name)}
                closeLabel={__('Cancel')}
                onRequestClose={() => {
                    setKeyword('');
                    setCharacters(Chars.Smileys);
                    onChange(toggleFormat(value, { type: name }));
                }}
            >
                <SearchControl
                    value={keyword}
                    onChange={newKeyword => {
                        onSearch(newKeyword);
                    }}
                />
                <TabPanel
                    className="homer-chars-tabpanel"
                    activeClass="is-active-tab"
                    onSelect={onSelect}
                    tabs={[
                        {
                            name: 'Smileys',
                            title: __('😃 Smileys & People', homer.name),
                            className: 'homer-chars-smileys',
                        },
                        {
                            name: 'Animals',
                            title: __('🐻 Animals & Nature', homer.name),
                            className: 'homer-chars-animals',
                        },
                        {
                            name: 'Food',
                            title: __('🍔 Food & Drink', homer.name),
                            className: 'homer-chars-food',
                        },
                        {
                            name: 'Activity',
                            title: __('⚽ Activity', homer.name),
                            className: 'homer-chars-activity',
                        },
                        {
                            name: 'Travel',
                            title: __('🚀 Travel & Places', homer.name),
                            className: 'homer-chars-travel',
                        },
                        {
                            name: 'Objects',
                            title: __('💡 Objects', homer.name),
                            className: 'homer-chars-objects',
                        },
                        {
                            name: 'Symbols',
                            title: __('💕 Symbols', homer.name),
                            className: 'homer-chars-symbols',
                        },
                        {
                            name: 'Flags',
                            title: __('🎌 Flags', homer.name),
                            className: 'homer-chars-flags',
                        },
                        {
                            name: 'Cream',
                            title: __('👋🏼 Medium Light', homer.name),
                            className: 'homer-chars-light',
                        },
                        {
                            name: 'Medium',
                            title: __('👋🏽 Medium', homer.name),
                            className: 'homer-chars-medium',
                        },
                        {
                            name: 'MediumDark',
                            title: __('👋🏾 Medium Dark', homer.name),
                            className: 'homer-chars-mediumdark',
                        },
                        {
                            name: 'Dark',
                            title: __('👋🏿 Dark', homer.name),
                            className: 'homer-chars-dark',
                        },
                        {
                            name: 'Other',
                            title: __('𓀜 Other', homer.name),
                            className: 'homer-chars-other',
                        },
                    ]}
                >
                    {() => {
                        return (
                            <Fragment>
                                {Object.keys(characters).length > 0 ? (
                                    <ul className="homer-chars-list">
                                        {map(characters, (character, key) => {
                                            return (
                                                <li key={'homer-chars-' + key}>
                                                    <Tooltip text={character.name ? upperFirst(character.name.toLowerCase()) : ''}>
                                                        <Button
                                                            isTertiary
                                                            onClick={() => {
                                                                setKeyword('');
                                                                setCharacters(Chars.Smileys);
                                                                onChange(insert(value, character.char));
                                                            }}
                                                        >
                                                            {character.char}
                                                        </Button>
                                                    </Tooltip>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p>{__('No emoji found.', homer.name)}</p>
                                )}
                            </Fragment>
                        );
                    }}
                </TabPanel>
            </Modal>
        );
    }

    return '';
}

export default Specialchars;
