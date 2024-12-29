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
    const [characters, setCharacters] = useState(Chars.Misc);
    const [keyword, setKeyword] = useState('');
    const { name, value, isActive, onChange } = props;

    const onSearch = keyword => {
        let filtered = {};

        map(Chars, characters => {
            map(characters, (character, key) => {
                if (character.name.toLowerCase().search(keyword.toLowerCase()) !== -1) {
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
                title={__('Insert Special Character', homer.name)}
                closeLabel={__('Cancel')}
                onRequestClose={() => {
                    setKeyword('');
                    setCharacters(Chars.Misc);
                    onChange(toggleFormat(value, { type: name }));
                }}
            >
                <SearchControl
                    value={keyword}
                    placeholder={__('Search', homer.name)}
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
                            name: 'Misc',
                            title: __('Misc', homer.name),
                            className: 'homer-chars-misc',
                        },
                        {
                            name: 'Math',
                            title: __('Math', homer.name),
                            className: 'homer-chars-math',
                        },
                        {
                            name: 'Latin',
                            title: __('Latin', homer.name),
                            className: 'homer-chars-latin',
                        },
                        {
                            name: 'Arrows',
                            title: __('Arrows', homer.name),
                            className: 'homer-chars-arrows',
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
                                                    <Tooltip text={upperFirst(character.name.toLowerCase())}>
                                                        <Button
                                                            isTertiary
                                                            onClick={() => {
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
                                    <p>{__('No characters found.', homer.name)}</p>
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
