/**
 * Internal dependencies
 */
const { makeid, startStopAnimationEvent } = homer.helpers;

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerFormatType, applyFormat } = wp.richText;
const { BlockControls } = wp.blockEditor;
const { ToolbarGroup, ToolbarDropdownMenu } = wp.components;

const name = homer.name + '/main';

/**
 * Register Format
 */
registerFormatType(name, {
    title: __('Homer formats', homer.name),
    tagName: 'span',
    className: 'homer-main',
    edit(props) {
        const { value, onChange } = props;
        const { start, end } = value;
        const controls = [];
        const formats = value.activeFormats ? value.activeFormats.map(item => item.type) : [];
        const hasNoValue = start === end;

        if ( window.homer.components.typewriter && !formats.includes(homer.name + '/typewriter')  ) {
            controls.push({
                title: 'Text animation',
                icon: homer.icons.typeIcon,
                isDisabled: hasNoValue,
                onClick: () => {
                    const typewriterId = makeid();
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/typewriter',
                            attributes: {
                                settings: JSON.stringify({
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
                                }),
                                result: '',
                                id: typewriterId,
                                style: '1',
                            },
                        }),
                    );
                    startStopAnimationEvent(document.getElementById(typewriterId));
                },
            })
        }
        
        if ( window.homer.components.sr && !formats.includes(homer.name + '/sr') ) {
            controls.push({
                title: __('Screen readers', homer.name),
                icon: homer.icons.sr,
                isDisabled: hasNoValue,
                onClick: () => {
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/sr'
                        }),
                    );
                },
            })
        }
        
        if ( window.homer.components.lang && !formats.includes(homer.name + '/lang') ) {
            controls.push({
                title: __('Lang attribute', homer.name),
                icon: homer.icons.lang,
                isDisabled: hasNoValue,
                onClick: () => {
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/lang'
                        }),
                    );
                },
            })
        }

        if ( window.homer.components.spoiler && !formats.includes(homer.name + '/spoiler') ) {
            controls.push({
                title: __('Show more', homer.name),
                icon: homer.icons.more,
                isDisabled: hasNoValue,
                onClick: () => {
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/spoiler'
                        }),
                    );
                },
            })
        }

        if ( window.homer.components.popover && !formats.includes(homer.name + '/popover') ) {
            controls.push({
                title: __('Popover', homer.name),
                icon: homer.icons.popover,
                isDisabled: hasNoValue,
                onClick: () => {
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/popover',
                            attributes: {
                                text: 'Popover',
                            }
                        }),
                    );
                },
            })
        }

        if ( window.homer.components.lowercase && !formats.includes(homer.name + '/lowercase') ) {
            controls.push({
                title: __('Lowercase', homer.name),
                icon: homer.icons.lowercase,
                isDisabled: hasNoValue,
                onClick: () => {
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/lowercase'
                        }),
                    );
                },
            })
        }

        if ( window.homer.components.capitalize && !formats.includes(homer.name + '/capitalize') ) {
            controls.push({
                title: __('Capitalize', homer.name),
                icon: homer.icons.capitalize,
                isDisabled: hasNoValue,
                onClick: () => {
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/capitalize'
                        }),
                    );
                },
            })
        }

        if ( window.homer.components.uppercase && !formats.includes(homer.name + '/uppercase') ) {
            controls.push({
                title: __('Uppercase', homer.name),
                icon: homer.icons.uppercase,
                isDisabled: hasNoValue,
                onClick: () => {
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/uppercase'
                        }),
                    );
                },
            })
        }

        if ( window.homer.components.underline && !formats.includes(homer.name + '/underline') ) {
            controls.push({
                title: __('Underline', homer.name),
                icon: homer.icons.underline,
                isDisabled: hasNoValue,
                onClick: () => {
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/underline'
                        }),
                    );
                },
            })
        }

        if ( window.homer.components.chars && !formats.includes(homer.name + '/specialchars') ) {
            controls.push({
                title: __('Special Characters', homer.name),
                icon: "editor-customchar",
                isDisabled: !hasNoValue,
                onClick: () => {
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/specialchars'
                        }),
                    );
                },
            })
        }

        if ( window.homer.components.emoji && !formats.includes(homer.name + '/emoji') ) {
            controls.push({
                title: __('Emoji', homer.name),
                icon: homer.icons.emoji,
                isDisabled: !hasNoValue,
                onClick: () => {
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/emoji'
                        }),
                    );
                },
            })
        }

        if ( window.homer.components.icons && !formats.includes(homer.name + '/icons') ) {
            controls.push({
                title: __('Icons', homer.name),
                icon: homer.icons.icons,
                isDisabled: !hasNoValue,
                onClick: () => {
                    onChange(
                        applyFormat(value, {
                            type: homer.name + '/icons'
                        }),
                    );
                },
            })
        }

        if ( controls.length ) {
            return (
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={ homer.icons.homer }
                            label="Homer formats"
                            controls={ controls }
                            className="homer-main-dropdown"
                        />
                    </ToolbarGroup>
                </BlockControls>
            );
        } else {
            return ;
        }
    },
});
