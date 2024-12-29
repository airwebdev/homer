<?php

/**
 * Plugin action and row meta links
 */

namespace airweb\homer;

if (!defined('ABSPATH')) {
    exit(); // Exit if accessed directly
}

class ActionMetaLinks
{
    public function run()
    {
        add_filter('plugin_action_links_' . AIRWEB_HOMER__FILE, [$this, 'homer_action_links']);
    }

    /**
     * Add plugin_action_links
     */
    public function homer_action_links($links)
    {
        return array_merge(
            [
                '<a href="' .
                    admin_url('options-general.php?page=homer') .
                    '" title="' .
                    __('Features Manager', 'homer') .
                    '">' .
                    __('Settings', 'homer') .
                    '</a>',
            ],
            $links
        );

        return $links;
    }
}
