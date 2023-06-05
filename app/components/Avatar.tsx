import { User } from '@prisma/client';
import Image from 'next/image';

import userNoPofile from '@/assets/userNoProfile.png';

interface Props {
	user: User;
}
const Avatar = ({ user }: Props) => {
	return (
		<div className='relative h-7 w-7'>
			<div className='absolute -left-1 -top-1 h-2 w-2 rounded-full bg-green-400' />
			<Image src={user?.image || userNoPofile} fill alt='Avatar Image' />
		</div>
	);
};

export default Avatar;
