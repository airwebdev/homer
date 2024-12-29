/* eslint-disable camelcase */
const { set } = require('animejs');
/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editor;
const { Panel, PanelBody, Spinner, Button, FormToggle, Flex, FlexBlock, FlexItem } = wp.components;
const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { select, dispatch } = wp.data;
const { store: blockEditorStore } = wp.blockEditor;
const { store: blockDirectoryStore } = wp.blockDirectory;

class HomerSidebar extends Component {
    constructor() {
        super(...arguments);

        this.changeAnimationsOptions = this.changeAnimationsOptions.bind(this);
        this.changeAnimationsFavouriteIconNames = this.changeAnimationsFavouriteIconNames.bind(this);

        // sets initial states
        this.state = {
            isAPILoaded: false,
            monoblock_status: '',
            homer_is_animantion_sidebar_settings_panel_enabled: false,
            animationAvailableOptions: [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ],
            animationIsFavouriteIconNames: [
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
                'star-empty',
            ],
        };
    }

    componentDidMount() {
        // updates states from wp_options
        wp.api.loadPromise.then(() => {
            this.settings = new wp.api.models.Settings();
            this.settings.fetch().then(response => {
                const newArrayOfAvailables = [...this.state.animationAvailableOptions];
                const newArrayOfFavourites = [...this.state.animationIsFavouriteIconNames];
                homer.animationAvailableOptionsNames.map((value, index) => {
                    newArrayOfAvailables[index] = Boolean(response[value]);
                });
                homer.animationIsFavouriteIconsNamesOptions.map((value, index) => {
                    newArrayOfFavourites[index] = String(response[value]);
                });
                this.setState({
                    homer_is_animantion_sidebar_settings_panel_enabled: Boolean(
                        response.homer_is_animantion_sidebar_settings_panel_enabled,
                    ),
                    animationAvailableOptions: newArrayOfAvailables,
                    animationIsFavouriteIconNames: newArrayOfFavourites,
                    isAPILoaded: true,
                });
            });
            this.setState({
                monoblock_status: select(blockEditorStore).canInsertBlockType('iori/monoblock')
                    ? 'active'
                    : 'Install/Activate',
            });
        });
    }

    changeAnimationsOptions(index) {
        const newArray = [...this.state.animationAvailableOptions];
        newArray[index] = Boolean(!this.state.animationAvailableOptions[index]);

        // change option_value in wp_options
        const model = new wp.api.models.Settings({
            // eslint-disable-next-line camelcase
            [homer.animationAvailableOptionsNames[index]]: newArray[index],
        });
        model.save();

        this.setState({
            animationAvailableOptions: newArray,
        });
    }

    changeAnimationsFavouriteIconNames(index) {
        const newArray = [...this.state.animationIsFavouriteIconNames];
        const currentName = String(this.state.animationIsFavouriteIconNames[index]);
        newArray[index] = currentName === 'star-empty' ? 'star-filled' : 'star-empty';

        // change option_value in wp_options
        const model = new wp.api.models.Settings({
            // eslint-disable-next-line camelcase
            [homer.animationIsFavouriteIconsNamesOptions[index]]: newArray[index],
        });
        model.save();

        this.setState({
            animationIsFavouriteIconNames: newArray,
        });
    }

    createAnimationControlsFor(animationNamesArray) {
        const createdAnimanitonsControls = [];
        animationNamesArray.forEach((value, index) => {
            createdAnimanitonsControls.push(
                <Flex align="center" justify="space-between">
                    <FlexItem style={{ display: 'flex', alignItems: 'center' }}>
                        <FormToggle
                            checked={this.state.animationAvailableOptions[index]}
                            onChange={() => this.changeAnimationsOptions(index)}
                        />
                    </FlexItem>
                    <FlexBlock style={{ display: 'flex', alignItems: 'center' }}>
                        <span>{value}</span>
                    </FlexBlock>
                    <FlexItem style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={() => this.changeAnimationsFavouriteIconNames(index)}
                            icon={this.state.animationIsFavouriteIconNames[index]}
                        />
                    </FlexItem>
                </Flex>,
            );
        });
        return createdAnimanitonsControls;
    }

    activatePlugin() {
        const { getDownloadableBlocks } = select(blockDirectoryStore);
        const blocks = getDownloadableBlocks('block:iori/monoblock').filter(({ name }) => 'iori/monoblock' === name);
        const block = blocks.length && blocks[0];
        const { installBlockType } = dispatch(blockDirectoryStore);

        this.setState({ monoblock_status: 'Installing...' });
        installBlockType(block).then(success => {
            if (success) this.setState({ monoblock_status: 'Reload page' });
        });
    }

    render() {
        if (!this.state.isAPILoaded) {
            return (
                <PluginSidebar name="homer-sidebar" title={__('Homer Settings', homer.name)} icon={homer.homerIcon}>
                    <Panel>
                        <Spinner />
                    </Panel>
                </PluginSidebar>
            );
        }
        return (
            <Fragment>
                <PluginSidebarMoreMenuItem target="homer-sidebar" icon="superhero">
                    {__('Homer Settings', homer.name)}
                </PluginSidebarMoreMenuItem>
                <PluginSidebar name="homer-sidebar" title={__('Homer Settings', homer.name)} icon={homer.homerIcon}>
                    <Panel>
                        <a
                            href="/wp-admin/options-general.php?page=homer"
                            target="_blank"
                            type="button"
                            aria-expanded="false"
                            class="components-button components-panel__body-toggle homer__sidebar-link"
                        >
                            {__('Homer Features Manager', homer.name)}
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M18.2 17c0 .7-.6 1.2-1.2 1.2H7c-.7 0-1.2-.6-1.2-1.2V7c0-.7.6-1.2 1.2-1.2h3.2V4.2H7C5.5 4.2 4.2 5.5 4.2 7v10c0 1.5 1.2 2.8 2.8 2.8h10c1.5 0 2.8-1.2 2.8-2.8v-3.6h-1.5V17zM14.9 3v1.5h3.7l-6.4 6.4 1.1 1.1 6.4-6.4v3.7h1.5V3h-6.3z" />
                            </svg>
                        </a>
                        <PanelBody
                            initialOpen={false}
                            title={__('Animations Settings', homer.name)}
                            buttonProps={{ disabled: this.state.homer_is_animantion_sidebar_settings_panel_enabled }}
                        >
                            <p>
                                {__(
                                    'Here you can add animation style to favourites or remove it from selections.',
                                    homer.name,
                                )}
                            </p>
                            {this.createAnimationControlsFor(homer.animationsNames).map(element => {
                                return element;
                            })}
                            <p>{__("To see changes reopen 'Edit' popup.", homer.name)}</p>
                        </PanelBody>
                    </Panel>
                </PluginSidebar>
            </Fragment>
        );
    }
}

registerPlugin(homer.name, {
    render: HomerSidebar,
});
