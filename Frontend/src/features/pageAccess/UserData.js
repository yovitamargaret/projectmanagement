import UseAuth from "./UsePageAccess"

const UserData = () => {
    const { auth } = UseAuth();

    return (auth);
}

export default UserData;