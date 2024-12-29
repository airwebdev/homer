/* eslint-disable camelcase */
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Button, PanelBody, PanelRow, Spinner, ToggleControl, Card, CardBody, CardHeader } = wp.components;
const { render, Component, Fragment } = wp.element;
const { models, loadPromise } = wp.api;

/**
* Internal dependencies
*/
import '../scss/settingsPage.scss';
import './editor/EditorHelpers';

class SettingsPage extends Component {
    constructor() {
        super(...arguments);

        this.changeOptions = this.changeOptions.bind(this);

        this.state = {
            isAPILoaded: false,
            isAPISaving: false,
            homer_hidden_text_spoiler: false,
            homer_text_animation: false,
            homer_uppercase: false,
            homer_lowercase: false,
            homer_capitalize: false,
            homer_underline: false,
            homer_sr: false,
            homer_lang: false,
            homer_emoji: false,
            homer_icons: false,
            homer_popover: false,
            homer_wp_emoji: false,
            homer_special_characters: false,
            homer_is_animantion_sidebar_settings_panel_enabled: false,
        };
    }

    componentDidMount() {
        loadPromise.then(() => {
            this.settings = new models.Settings();

            if (false === this.state.isAPILoaded) {
                this.settings.fetch().then(response => {
                    this.setState({
                        homer_hidden_text_spoiler: Boolean(response.homer_hidden_text_spoiler),
                        homer_text_animation: Boolean(response.homer_text_animation),
                        homer_uppercase: Boolean(response.homer_uppercase),
                        homer_lowercase: Boolean(response.homer_lowercase),
                        homer_capitalize: Boolean(response.homer_capitalize),
                        homer_underline: Boolean(response.homer_underline),
                        homer_sr: Boolean(response.homer_sr),
                        homer_lang: Boolean(response.homer_lang),
                        homer_emoji: Boolean(response.homer_emoji),
                        homer_icons: Boolean(response.homer_icons),
                        homer_popover: Boolean(response.homer_popover),
                        homer_wp_emoji: Boolean(response.homer_wp_emoji),
                        homer_special_characters: Boolean(response.homer_special_characters),
                        homer_is_animantion_sidebar_settings_panel_enabled: Boolean(response.homer_is_animantion_sidebar_settings_panel_enabled),
                        isAPILoaded: true
                    });
                });
            }
        });
    }

    changeOptions(option, value) {
        this.setState({ isAPISaving: true });

        const model = new models.Settings({
            // eslint-disable-next-line camelcase
            [option]: value
        });

        model.save().then(response => {
            this.setState({
                [option]: response[option],
                isAPISaving: false
            });
        });

    }

    render() {

        if (!this.state.isAPILoaded) {
            return (
                <Fragment>
                    <div className="homer-header">
                        <div className="homer-container">
                            <div className="homer-logo">
                                <Spinner />
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <div className="homer-header">
                    <div className="homer-container">
                        <div className="homer-logo">
                            <h1>{__('Homer Features Manager', homer.name)}</h1>
                        </div>
                    </div>
                </div>

                <div className="homer-main">
                    <Card>
                        <CardHeader>{__('All features are active by default. You can disable any features you don\'t want to use or re-enable them anytime on this page.', homer.name)}</CardHeader>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "TEXT ANIMATION" text feature', homer.name)}
                                checked={this.state.homer_text_animation}
                                onChange={() => {
                                    this.changeOptions('homer_text_animation', !this.state.homer_text_animation);
                                    this.changeOptions('homer_is_animantion_sidebar_settings_panel_enabled', !this.state.homer_is_animantion_sidebar_settings_panel_enabled);
                                }}
                            // help={__('To apply changes reload editor.', homer.name)}
                            />
                        </CardBody>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "SHOW MORE" text feature', homer.name)}
                                checked={this.state.homer_hidden_text_spoiler}
                                help={__('Dependency free', homer.name)}
                                onChange={() => this.changeOptions('homer_hidden_text_spoiler', !this.state.homer_hidden_text_spoiler)}
                            />
                        </CardBody>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "UPPERCASE" text format', homer.name)}
                                checked={this.state.homer_uppercase}
                                help={__('Dependency free', homer.name)}
                                onChange={() => this.changeOptions('homer_uppercase', !this.state.homer_uppercase)}
                            />
                        </CardBody>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "LOWERCASE" text format', homer.name)}
                                checked={this.state.homer_lowercase}
                                help={__('Dependency free', homer.name)}
                                onChange={() => this.changeOptions('homer_lowercase', !this.state.homer_lowercase)}
                            />
                        </CardBody>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "CAPITALIZE" text format', homer.name)}
                                checked={this.state.homer_capitalize}
                                help={__('Dependency free', homer.name)}
                                onChange={() => this.changeOptions('homer_capitalize', !this.state.homer_capitalize)}
                            />
                        </CardBody>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "UNDERLINE" text format', homer.name)}
                                checked={this.state.homer_underline}
                                help={__('Dependency free', homer.name)}
                                onChange={() => this.changeOptions('homer_underline', !this.state.homer_underline)}
                            />
                        </CardBody>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "SCREEN READERS / VISUALLY HIDDEN" text feature', homer.name)}
                                checked={this.state.homer_sr}
                                help={__('Dependency free', homer.name)}
                                onChange={() => this.changeOptions('homer_sr', !this.state.homer_sr)}
                            />
                        </CardBody>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "LANG ATTRIBUTE" text feature', homer.name)}
                                checked={this.state.homer_lang}
                                help={__('Dependency free. Styles free', homer.name)}
                                onChange={() => this.changeOptions('homer_lang', !this.state.homer_lang)}
                            />
                        </CardBody>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "POPOVER" feature', homer.name)}
                                checked={this.state.homer_popover}
                                help={__('Dependency free', homer.name)}
                                onChange={() => this.changeOptions('homer_popover', !this.state.homer_popover)}
                            />
                        </CardBody>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "EMOJI" inserter', homer.name)}
                                checked={this.state.homer_emoji}
                                help={__('Dependency free. Styles free', homer.name)}
                                onChange={() => this.changeOptions('homer_emoji', !this.state.homer_emoji)}
                            />
                            {this.state.homer_emoji ? <ToggleControl
                                className="homer-settings-toggle-p"
                                label={__("Disable Wordpress Core Emojis", homer.name)}
                                checked={this.state.homer_wp_emoji}
                                help={__('By default, Wordpress replaces emoji with its own version - image from external site', homer.name)}
                                onChange={() => this.changeOptions('homer_wp_emoji', !this.state.homer_wp_emoji)}
                            /> : ''}
                        </CardBody>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "SPECIAL CHARACTERS" inserter', homer.name)}
                                checked={this.state.homer_special_characters}
                                help={__('Dependency free. Styles free', homer.name)}
                                onChange={() => this.changeOptions('homer_special_characters', !this.state.homer_special_characters)}
                            />
                        </CardBody>
                        <CardBody>
                            <ToggleControl
                                label={__('Enable "ICONS" inserter', homer.name)}
                                checked={this.state.homer_icons}
                                help={__('Dependency free', homer.name)}
                                onChange={() => this.changeOptions('homer_icons', !this.state.homer_icons)}
                            />
                        </CardBody>
                    </Card>
                </div>
            </Fragment>
        );
    }
}

render(
    <SettingsPage />,
    document.getElementById('AIRWEB_HOMER')
);
