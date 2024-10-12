import { User } from "../types";

type Props = {
    user: User;
    loggedInUserId: string | undefined;
    onShowUserProfile: (userId: string) => void;
    onMessageUser: (user: User) => void;
    isSelected?: boolean;
};

const UserListItem = ({
    user,
    loggedInUserId,
    onShowUserProfile,
    onMessageUser,
    isSelected
}: Props) => {
    return (
        <div className={`flex items-center justify-between p-2 text-sm my-2 bg-gray-50 rounded hover:bg-indigo-50 ${isSelected && "bg-green-200 hover:bg-green-200"}`}>
            <div className="flex items-center gap-8">
                <img
                    src={user.avatar}
                    height={32}
                    width={32}
                    className="rounded-full cursor-pointer"
                    onClick={() => onShowUserProfile(user._id)}
                />
                {loggedInUserId === user._id ? (
                    <p>You</p>
                ) : (
                    <p>
                        {typeof user.username === "string" &&
                        user.username.trim().length > 0
                            ? user.username
                            : user.email}
                    </p>
                )}
            </div>
            {loggedInUserId !== user._id && (
                <button
                    className="font-medium underline"
                    onClick={() => onMessageUser(user)}
                >
                    Message
                </button>
            )}
        </div>
    );
};

export default UserListItem;
