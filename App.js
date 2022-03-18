import { Main }                        from "./src/pages/Main";
import { Cities }                      from "./src/pages/Cities";
import { NativeRouter, Routes, Route } from "react-router-native";

export default function App() {
    return (
        <NativeRouter>
            <Routes>
                <Route path={ '/' } element={ <Main/> }/>
                <Route path={ '/cities' } element={ <Cities/> }/>
            </Routes>
        </NativeRouter>
    );
};
