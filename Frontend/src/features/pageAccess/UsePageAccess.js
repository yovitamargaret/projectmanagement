import { useContext } from "react"
import AccessContext from "./AccessProvider"

const UsePageAccess = () => {
    return useContext(AccessContext);
}

export default UsePageAccess;