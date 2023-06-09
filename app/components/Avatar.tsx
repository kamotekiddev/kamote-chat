import { User } from '@prisma/client';
import Image from 'next/image';

import userNoPofile from '@/assets/userNoProfile.png';

interface Props {
	user: User;
}
const Avatar = ({ user }: Props) => {
	return (
		<div className='relative select-none'>
			<div className='absolute -left-1 -top-2 h-2 w-2 rounded-full bg-green-400' />
			<div className='relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-indigo-600'>
				<Image src={user?.image || userNoPofile} fill alt='Avatar Image' />
			</div>
		</div>
	);
};

export default Avatar;
