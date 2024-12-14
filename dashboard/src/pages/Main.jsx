import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

function Main() {

    return (

        <div className='px-2'>
            <Header />
            <section className="min-h-[90vh]">
                <Outlet />
            </section>
        </div>

    );
}

export default Main