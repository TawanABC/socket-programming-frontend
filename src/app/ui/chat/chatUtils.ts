import { User } from '@/common/model'
import { getUserById } from '@/services/userService';


export async function fetchOtherUser({ userIds, userId }: { userIds: User[], userId: string }) {

    const otherUserId = userIds.find((otherId) => otherId.userId !== userId)?.userId
    if (otherUserId) {
        try {
            const userData = await getUserById(otherUserId)
            console.log(userData);
            return userData
        } catch (err) {
            console.error('Failed to fetch user:', err)
        }
    }
}
