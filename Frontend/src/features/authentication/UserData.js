import UseAuth from "./UseAuth"

const UserData = () => {
    const { auth } = UseAuth();

    return (auth);
}

export default UserData;