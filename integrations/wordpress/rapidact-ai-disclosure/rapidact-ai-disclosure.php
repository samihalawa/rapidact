<?php
/**
 * Plugin Name: RapidAct AI Disclosure
 * Plugin URI: https://rapidact.eu/article-50
 * Description: Add a configurable, visitor-facing AI-use notice that stays current through RapidAct's hosted runtime.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: RapidAct
 * Author URI: https://rapidact.eu
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: rapidact-ai-disclosure
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const RAPIDACT_AI_DISCLOSURE_OPTION = 'rapidact_ai_disclosure';
const RAPIDACT_AI_DISCLOSURE_SCRIPT = 'https://rapidact.eu/rapidact-badge.js';

/**
 * Return the complete settings shape.
 *
 * @return array<string, string>
 */
function rapidact_ai_disclosure_defaults() {
	return array(
		'enabled'     => '1',
		'language'    => 'auto',
		'title'       => '',
		'message'     => '',
		'system'      => '',
		'provider'    => '',
		'details_url' => '',
		'position'    => 'right',
		'color'       => '#1f3a5f',
	);
}

/**
 * Add defaults without overwriting an existing configuration.
 */
function rapidact_ai_disclosure_activate() {
	add_option( RAPIDACT_AI_DISCLOSURE_OPTION, rapidact_ai_disclosure_defaults() );
}
register_activation_hook( __FILE__, 'rapidact_ai_disclosure_activate' );

/**
 * Sanitize the settings array before WordPress stores it.
 *
 * @param mixed $input Submitted setting.
 * @return array<string, string>
 */
function rapidact_ai_disclosure_sanitize( $input ) {
	$input    = is_array( $input ) ? $input : array();
	$defaults = rapidact_ai_disclosure_defaults();
	$languages = array( 'auto', 'en', 'es', 'de', 'fr', 'it' );
	$positions = array( 'left', 'right' );
	$color     = isset( $input['color'] ) ? sanitize_hex_color( $input['color'] ) : '';

	return array(
		'enabled'     => isset( $input['enabled'] ) ? '1' : '0',
		'language'    => isset( $input['language'] ) && in_array( $input['language'], $languages, true )
			? $input['language']
			: $defaults['language'],
		'title'       => isset( $input['title'] ) ? sanitize_text_field( $input['title'] ) : '',
		'message'     => isset( $input['message'] ) ? sanitize_textarea_field( $input['message'] ) : '',
		'system'      => isset( $input['system'] ) ? sanitize_text_field( $input['system'] ) : '',
		'provider'    => isset( $input['provider'] ) ? sanitize_text_field( $input['provider'] ) : '',
		'details_url' => isset( $input['details_url'] ) ? esc_url_raw( $input['details_url'] ) : '',
		'position'    => isset( $input['position'] ) && in_array( $input['position'], $positions, true )
			? $input['position']
			: $defaults['position'],
		'color'       => $color ? $color : $defaults['color'],
	);
}

/**
 * Register one array option through WordPress's native Settings API.
 */
function rapidact_ai_disclosure_register_settings() {
	register_setting(
		'rapidact_ai_disclosure',
		RAPIDACT_AI_DISCLOSURE_OPTION,
		array(
			'type'              => 'array',
			'sanitize_callback' => 'rapidact_ai_disclosure_sanitize',
			'default'           => rapidact_ai_disclosure_defaults(),
		)
	);
}
add_action( 'admin_init', 'rapidact_ai_disclosure_register_settings' );

/**
 * Add the settings page below Settings.
 */
function rapidact_ai_disclosure_add_settings_page() {
	add_options_page(
		__( 'RapidAct AI Disclosure', 'rapidact-ai-disclosure' ),
		__( 'RapidAct AI Disclosure', 'rapidact-ai-disclosure' ),
		'manage_options',
		'rapidact-ai-disclosure',
		'rapidact_ai_disclosure_render_settings_page'
	);
}
add_action( 'admin_menu', 'rapidact_ai_disclosure_add_settings_page' );

/**
 * Render a text input.
 *
 * @param string               $name Option key.
 * @param array<string,string> $options Current options.
 * @param string               $placeholder Optional placeholder.
 * @param string               $type Input type.
 */
function rapidact_ai_disclosure_text_input( $name, $options, $placeholder = '', $type = 'text' ) {
	printf(
		'<input class="regular-text" type="%1$s" id="rapidact-%2$s" name="%3$s[%2$s]" value="%4$s" placeholder="%5$s">',
		esc_attr( $type ),
		esc_attr( $name ),
		esc_attr( RAPIDACT_AI_DISCLOSURE_OPTION ),
		esc_attr( $options[ $name ] ),
		esc_attr( $placeholder )
	);
}

/**
 * Render the compact native settings form.
 */
function rapidact_ai_disclosure_render_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$options = wp_parse_args(
		get_option( RAPIDACT_AI_DISCLOSURE_OPTION, array() ),
		rapidact_ai_disclosure_defaults()
	);
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'RapidAct AI Disclosure', 'rapidact-ai-disclosure' ); ?></h1>
		<p>
			<?php esc_html_e( 'Publish a clear AI-use notice across your site. The visitor interface loads from rapidact.eu so improvements arrive without reinstalling the plugin.', 'rapidact-ai-disclosure' ); ?>
		</p>
		<form action="options.php" method="post">
			<?php settings_fields( 'rapidact_ai_disclosure' ); ?>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><?php esc_html_e( 'Status', 'rapidact-ai-disclosure' ); ?></th>
					<td>
						<label>
							<input type="checkbox" name="<?php echo esc_attr( RAPIDACT_AI_DISCLOSURE_OPTION ); ?>[enabled]" value="1" <?php checked( $options['enabled'], '1' ); ?>>
							<?php esc_html_e( 'Show the notice on the public site', 'rapidact-ai-disclosure' ); ?>
						</label>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="rapidact-language"><?php esc_html_e( 'Language', 'rapidact-ai-disclosure' ); ?></label></th>
					<td>
						<select id="rapidact-language" name="<?php echo esc_attr( RAPIDACT_AI_DISCLOSURE_OPTION ); ?>[language]">
							<?php
							$languages = array(
								'auto' => __( 'Automatic', 'rapidact-ai-disclosure' ),
								'en'   => 'English',
								'es'   => 'Español',
								'de'   => 'Deutsch',
								'fr'   => 'Français',
								'it'   => 'Italiano',
							);
							foreach ( $languages as $value => $label ) {
								printf(
									'<option value="%1$s" %2$s>%3$s</option>',
									esc_attr( $value ),
									selected( $options['language'], $value, false ),
									esc_html( $label )
								);
							}
							?>
						</select>
						<p class="description"><?php esc_html_e( 'Automatic follows the page or visitor language.', 'rapidact-ai-disclosure' ); ?></p>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="rapidact-title"><?php esc_html_e( 'Title', 'rapidact-ai-disclosure' ); ?></label></th>
					<td>
						<?php rapidact_ai_disclosure_text_input( 'title', $options, __( 'Use the translated default', 'rapidact-ai-disclosure' ) ); ?>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="rapidact-message"><?php esc_html_e( 'Visitor message', 'rapidact-ai-disclosure' ); ?></label></th>
					<td>
						<textarea class="large-text" rows="3" id="rapidact-message" name="<?php echo esc_attr( RAPIDACT_AI_DISCLOSURE_OPTION ); ?>[message]" placeholder="<?php esc_attr_e( 'Use the translated default', 'rapidact-ai-disclosure' ); ?>"><?php echo esc_textarea( $options['message'] ); ?></textarea>
						<p class="description"><?php esc_html_e( 'Leave blank for the built-in translated message, or describe the AI interaction precisely.', 'rapidact-ai-disclosure' ); ?></p>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="rapidact-system"><?php esc_html_e( 'System name', 'rapidact-ai-disclosure' ); ?></label></th>
					<td><?php rapidact_ai_disclosure_text_input( 'system', $options, __( 'For example: Support assistant', 'rapidact-ai-disclosure' ) ); ?></td>
				</tr>
				<tr>
					<th scope="row"><label for="rapidact-provider"><?php esc_html_e( 'Responsible organisation', 'rapidact-ai-disclosure' ); ?></label></th>
					<td><?php rapidact_ai_disclosure_text_input( 'provider', $options ); ?></td>
				</tr>
				<tr>
					<th scope="row"><label for="rapidact-details_url"><?php esc_html_e( 'More-information URL', 'rapidact-ai-disclosure' ); ?></label></th>
					<td><?php rapidact_ai_disclosure_text_input( 'details_url', $options, 'https://example.com/ai-transparency', 'url' ); ?></td>
				</tr>
				<tr>
					<th scope="row"><label for="rapidact-position"><?php esc_html_e( 'Position', 'rapidact-ai-disclosure' ); ?></label></th>
					<td>
						<select id="rapidact-position" name="<?php echo esc_attr( RAPIDACT_AI_DISCLOSURE_OPTION ); ?>[position]">
							<option value="right" <?php selected( $options['position'], 'right' ); ?>><?php esc_html_e( 'Bottom right', 'rapidact-ai-disclosure' ); ?></option>
							<option value="left" <?php selected( $options['position'], 'left' ); ?>><?php esc_html_e( 'Bottom left', 'rapidact-ai-disclosure' ); ?></option>
						</select>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="rapidact-color"><?php esc_html_e( 'Accent colour', 'rapidact-ai-disclosure' ); ?></label></th>
					<td><?php rapidact_ai_disclosure_text_input( 'color', $options, '#1f3a5f' ); ?></td>
				</tr>
			</table>
			<?php submit_button(); ?>
		</form>
		<p>
			<a href="https://rapidact.eu/article-50" target="_blank" rel="noopener">
				<?php esc_html_e( 'Preview the notice and read the installation guide', 'rapidact-ai-disclosure' ); ?>
			</a>
		</p>
	</div>
	<?php
}

/**
 * Print the canonical hosted loader once, immediately before </body>.
 */
function rapidact_ai_disclosure_render_loader() {
	if ( is_admin() ) {
		return;
	}

	$options = wp_parse_args(
		get_option( RAPIDACT_AI_DISCLOSURE_OPTION, array() ),
		rapidact_ai_disclosure_defaults()
	);

	if ( '1' !== $options['enabled'] ) {
		return;
	}

	$attributes = array(
		'data-title'       => $options['title'],
		'data-message'     => $options['message'],
		'data-system'      => $options['system'],
		'data-provider'    => $options['provider'],
		'data-details-url' => $options['details_url'],
		'data-position'    => $options['position'],
		'data-color'       => $options['color'],
	);

	if ( 'auto' !== $options['language'] ) {
		$attributes['data-language'] = $options['language'];
	}

	echo '<script defer src="' . esc_url( RAPIDACT_AI_DISCLOSURE_SCRIPT ) . '"';
	foreach ( $attributes as $name => $value ) {
		if ( '' !== $value ) {
			printf( ' %s="%s"', esc_attr( $name ), esc_attr( $value ) );
		}
	}
	echo '></script>' . "\n";
}
add_action( 'wp_footer', 'rapidact_ai_disclosure_render_loader', 99 );
