import { User } from '@prisma/client';
import Image from 'next/image';

import userNoPofile from '@/assets/userNoProfile.png';

interface Props {
	user: User;
}
const Avatar = ({ user }: Props) => {
	return (
		<div className='relative select-none'>
			<div className='relative h-8 w-8 rounded-full ring-1 ring-indigo-600'>
				<div className='absolute right-0 top-0 h-2 w-2 rounded-full bg-green-400' />
				<Image
					src={user?.image || userNoPofile}
					fill
					alt='Avatar Image'
					className='rounded-full'
				/>
			</div>
		</div>
	);
};

export default Avatar;
