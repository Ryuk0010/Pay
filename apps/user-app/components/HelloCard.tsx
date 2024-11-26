import { getUserName } from "../app/lib/actions/getUserName";

export const HelloCard = async () => {
    let user;
    try {
        user = await getUserName();
    } catch (error) {
        console.error("Error fetching user:", error);
        return <div>Error fetching user information.</div>;
    }

    return (
        <div>
            <div>
                Hi {user?.name || "Guest"}
            </div>
        </div>
    );
};
