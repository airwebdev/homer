<?php

/**
 * Plugin review class.
 * Prompts users to give a review of the plugin on WordPress.org after a period of usage.
 *
 * @since 2.0.1
 *
 * @package airweb\homer
 */

namespace airweb\homer;

// Abort if this file is called directly.
if (!defined('WPINC')) {
    die();
}

/**
 * Main Feedback Notice Class
 */
class Homer_User_Feedback
{
    public function __construct()
    {
        // Add actions.
        add_action('admin_init', [$this, 'check_installation_date']);
        add_action('admin_init', [$this, 'set_no_bug'], 5);
    }

    /**
     * Seconds to words.
     *
     * @param string $seconds Seconds in time.
     */
    public function seconds_to_words($seconds)
    {
        // Get the years.
        $years = (intval($seconds) / YEAR_IN_SECONDS) % 100;
        if ($years > 1) {
            return sprintf(__('%s years', 'homer'), $years);
        } elseif ($years > 0) {
            return __('a year', 'homer');
        }

        // Get the weeks.
        $weeks = (intval($seconds) / WEEK_IN_SECONDS) % 52;
        if ($weeks > 1) {
            return sprintf(__('%s weeks', 'homer'), $weeks);
        } elseif ($weeks > 0) {
            return __('a week', 'homer');
        }

        // Get the days.
        $days = (intval($seconds) / DAY_IN_SECONDS) % 7;
        if ($days > 1) {
            return sprintf(__('%s days', 'homer'), $days);
        } elseif ($days > 0) {
            return __('a day', 'homer');
        }

        // Get the hours.
        $hours = (intval($seconds) / HOUR_IN_SECONDS) % 24;
        if ($hours > 1) {
            return sprintf(__('%s hours', 'homer'), $hours);
        } elseif ($hours > 0) {
            return __('an hour', 'homer');
        }

        // Get the minutes.
        $minutes = (intval($seconds) / MINUTE_IN_SECONDS) % 60;
        if ($minutes > 1) {
            return sprintf(__('%s minutes', 'homer'), $minutes);
        } elseif ($minutes > 0) {
            return __('a minute', 'homer');
        }

        // Get the seconds.
        $seconds = intval($seconds) % 60;
        if ($seconds > 1) {
            return sprintf(__('%s seconds', 'homer'), $seconds);
        } elseif ($seconds > 0) {
            return __('a second', 'homer');
        }
    }

    /**
     * Check date on admin initiation and add to admin notice if it was more than the time limit.
     */
    public function check_installation_date()
    {
        if (!get_site_option('homer_feedback_no_bug') || false === get_site_option('homer_feedback_no_bug')) {
            add_site_option('homer_feedback_activation_date', time());

            // Retrieve the activation date.
            $install_date = get_site_option('homer_feedback_activation_date');

            // If difference between install date and now is greater than time limit, then display notice.
            if (time() - $install_date > WEEK_IN_SECONDS) {
                add_action('admin_notices', [$this, 'display_admin_notice']);
            }
        }
    }

    /**
     * Display the admin notice.
     */
    public function display_admin_notice()
    {
        $screen = get_current_screen();

        if (isset($screen->base) && 'plugins' === $screen->base) {

            $no_bug_url = wp_nonce_url(
                admin_url('plugins.php?' . 'homer_feedback_no_bug' . '=true'),
                'homer-feedback-nounce'
            );
            $time = $this->seconds_to_words(time() - get_site_option('homer_feedback_activation_date'));
?>

            <style>
                .notice.homer-notice {
                    border-left-color: #32373C !important;
                    padding: 15px 25px 15px 15px;
                }

                .rtl .notice.homer-notice {
                    border-right-color: #32373C !important;
                }

                .notice.notice.homer-notice .homer-notice-inner {
                    display: table;
                    width: 100%;
                }

                .notice.homer-notice .homer-notice-inner .homer-notice-icon,
                .notice.homer-notice .homer-notice-inner .homer-notice-content,
                .notice.homer-notice .homer-notice-inner .homer-install-now {
                    display: table-cell;
                    vertical-align: middle;
                }

                .notice.homer-notice .homer-notice-icon {
                    font-size: 13px;
                    width: 70px;
                }

                .notice.homer-notice .homer-notice-icon img {
                    width: 70px;
                    vertical-align: middle;
                }

                .notice.homer-notice .homer-notice-content {
                    padding: 0 33px 0 15px;
                }

                .notice.homer-notice p {
                    padding: 0;
                    margin: 0;
                }

                .notice.homer-notice h3 {
                    margin: 0 0 8px;
                }

                .notice.homer-notice .homer-install-now {
                    text-align: center;
                }

                .notice.homer-notice .homer-install-now .homer-install-button {
                    padding: 8px 33px;
                    height: auto;
                    line-height: 20px;
                    background: #23282D;
                    border-color: #32373C #23282D #191E23;
                    box-shadow: 1.5px 1.5px 1px #82878C;
                    text-shadow: 1px 1px 2px #82878C;
                }

                .notice.homer-notice .homer-install-now .homer-install-button:hover {
                    background: #393f44;
                }

                .notice.homer-notice a.no-thanks {
                    display: block;
                    margin-top: 10px;
                    color: #72777c;
                    text-decoration: none;
                }

                .notice.homer-notice a.no-thanks:hover {
                    color: #191E23;
                }

                @media (max-width: 767px) {

                    .notice.notice.homer-notice .homer-notice-inner {
                        display: block;
                    }

                    .notice.homer-notice {
                        padding: 10px 15px !important;
                    }

                    .notice.homer-noticee .homer-notice-inner {
                        display: block;
                    }

                    .notice.homer-notice .homer-notice-inner .homer-notice-content {
                        display: block;
                        padding: 0;
                    }

                    .notice.homer-notice .homer-notice-inner .homer-notice-icon {
                        display: none;
                    }

                    .notice.homer-notice .homer-notice-inner .homer-install-now {
                        margin-top: 15px;
                        display: block;
                        text-align: left;
                    }

                    .notice.homer-notice .homer-notice-inner .no-thanks {
                        display: inline-block;
                        margin-left: 15px;
                    }
                }
            </style>
            <div class="notice updated homer-notice">
                <div class="homer-notice-inner">
                    <div class="homer-notice-content">
                        <h3><?php printf(
                                esc_html__('Are you enjoying %s Plugin?', 'homer'),
                                esc_html(__('"Homer - Block Editor Tools"', 'homer'))
                            ); ?></h3>
                        <p>
                            <?php printf(
                                esc_html__(
                                    'You have been using %1$s for %2$s now. Please leave us a review with your feedback! It works as a boost for us to keep working on the plugin!',
                                    'homer'
                                ),
                                esc_html(__('"Homer - Block Editor Tools"', 'homer')),
                                esc_html($time)
                            ); ?>
                        </p>
                    </div>
                    <div class="homer-install-now">
                        <?php printf(
                            '<a href="%1$s" class="button button-primary homer-install-button" target="_blank">%2$s</a>',
                            esc_url('https://wordpress.org/support/plugin/homer/reviews/#new-post'),
                            esc_html__('Leave a Review', 'homer')
                        ); ?>
                        <a href="<?php echo esc_url($no_bug_url); ?>" class="no-thanks"><?php echo esc_html__(
                                                                                            'No thanks / Already done',
                                                                                            'homer'
                                                                                        ); ?></a>
                    </div>
                </div>
            </div>
<?php
        }
    }

    /**
     * Set the plugin to no longer bug users if user asks not to be.
     */
    public function set_no_bug()
    {
        // Bail out if not on correct page.
        // phpcs:ignore
        if (
            !isset($_GET['_wpnonce']) ||
            (!wp_verify_nonce($_GET['_wpnonce'], 'homer-feedback-nounce') ||
                !is_admin() ||
                !isset($_GET['homer_feedback_no_bug']) ||
                !current_user_can('manage_options'))
        ) {
            return;
        }

        add_site_option('homer_feedback_no_bug', true);
    }
}

/*
 * Instantiate the Homer_User_Feedback class.
 */
new Homer_User_Feedback();
