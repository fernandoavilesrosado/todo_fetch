import React from "react";
import PropTypes from "prop-types";

const Todolist = props => {
	return (
		<li onClick={() => props.delete(props.id)}>
			<p>{props.text.label}</p>
		</li>
	);
};

export default Todolist;

Todolist.propTypes = {
	text: PropTypes.object,
	delete: PropTypes.func,
	id: PropTypes.number
};
