/**
 * External dependencies.
 */
import { Component } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';

/**
 * The internal dependencies.
 */
import FieldBase from '../../components/field-base';
import withField from '../../components/with-field';
import NoOptions from '../no-options';

class SetField extends Component {
	/**
	 * Handles the change of the input.
	 *
	 * @param {Object} e
	 * @return {void}
	 */
	handleChange = ( e ) => {
		const { field, onChange } = this.props;

		onChange( field.id, field.value, e.target.value );
	}

	/**
	 * Renders the set options
	 *
	 * @return {Object}
	 */
	renderOptions() {
		const {
			field,
			name,
			value,
			isChecked
		} = this.props;

		return field.options.map( ( option ) => (
			<label key={ `${ field.id }-${ option.value }` }>
				<input
					type="checkbox"
					id={ `${ field.id }-${ option.value }` }
					name={ `${ name }-${ option.value }` }
					checked={ isChecked( value, option ) }
					value={ option.value }
					onChange={ this.handleChange }
					{ ...field.attributes }
				/>

				{ option.label }
			</label>
		) );
	}

	/**
	 * Renders the component.
	 *
	 * @return {Object}
	 */
	render() {
		const { field } = this.props;

		return (
			<FieldBase field={ field } >
				{ field.options.length > 0
					? this.renderOptions()
					: <NoOptions />
				}
			</FieldBase>
		);
	}
}

addFilter( 'carbon-fields.set-field.metabox', 'carbon-fields/metaboxes', ( OriginalSetField ) => withField( ( props ) => {
	return (
		<OriginalSetField { ...props }>
			{ ( {
				field,
				name,
				value,
				isChecked,
				handleChange
			} ) => (
				<SetField
					field={ field }
					name={ name }
					value={ value }
					isChecked={ isChecked }
					onChange={ handleChange }
				/>
			) }
		</OriginalSetField>
	);
} ) );
