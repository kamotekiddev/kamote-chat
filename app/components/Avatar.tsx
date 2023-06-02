import { User } from '@prisma/client';
import Image from 'next/image';

import userNoPofile from '@/assets/userNoProfile.png';

interface Props {
	user: User;
}
const Avatar = ({ user }: Props) => {
	return (
		<div className='relative'>
			<Image src={user?.image || userNoPofile} fill alt='Avatar Image' />
		</div>
	);
};

export default Avatar;
