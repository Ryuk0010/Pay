import { getUserName } from "../app/lib/actions/getUserName";

export const HelloCard = async () => {
    const user = await getUserName();

    return (
        <div>
            <div>
                Hi {user.name}
            </div>
        </div>
    );
};
