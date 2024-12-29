<?php

/**
 * Deactivator
 *
 * @since 1.0.0
 *
 * @package airweb\homer
 */

namespace airweb\homer;

// Abort if this file is called directly.
if (!defined('WPINC')) {
    die();
}

/**
 * Class Deactivator.
 *
 * Runs when the plugin is deactivated.
 */
class Deactivator
{
    /**
     * Run Code.
     *
     * @since 1.0.0
     */
    public function run()
    {
        register_deactivation_hook(AIRWEB_HOMER_ROOT, [$this, 'deactivate']);
    }

    /**
     * Deactivate
     *
     * Runs code on deactivation.
     *
     * @since 1.0.0
     */
    public function deactivate()
    {
        // Set a transient to confirm deactivation.
        set_transient(AIRWEB_HOMER_PREFIX . '_activated', false);
    }
}
