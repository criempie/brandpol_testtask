import { Header } from "../components/Header";
import { Temperature } from "../components/Temperature";
import { Detail } from "../components/Detail/Detail";

export const Main = () => {
    return (
        <>
            <Header/>
            <Temperature />
            <Detail />
        </>
    );
};
