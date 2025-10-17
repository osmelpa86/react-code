import './App.css'
import {ListOfUser} from "./components/ListOfUser.tsx";
import {CreateNewUser} from "./components/CreateNewUser.tsx";
import {Toaster} from "sonner";

function App() {

    return (
        <>
            <ListOfUser/>
            <CreateNewUser/>
            <Toaster richColors/>
        </>
    )
}

export default App