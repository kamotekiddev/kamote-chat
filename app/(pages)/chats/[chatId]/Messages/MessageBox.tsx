import React from 'react';
import { FullMessage } from '.';

interface Props {
	message: FullMessage;
}

const MessageBox = ({ message }: Props) => {
	return <div>Message</div>;
};

export default MessageBox;
