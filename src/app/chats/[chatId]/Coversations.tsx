import React from 'react';

const ConversationBubble = ({ id, seen, sender, body, image }: Message) => {
	return (
		<div>
			<p>{body && body}</p>
		</div>
	);
};

const Coversations = () => {
	return <div>Coversations</div>;
};

export default Coversations;
