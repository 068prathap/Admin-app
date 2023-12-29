import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import FormPage from "../pages/formPage";
import Preview from "../pages/preview";
import MiniDrawer from "../pages/dashboard";
import Authentication from "../pages/authentication";
import ErrorPage from "../pages/errorPage";

function Router() {
    const isLogin = useSelector((state) => state.loginResponse)

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' render={() => JSON.parse(localStorage.getItem('isLogin')) ? <Redirect to={`/${localStorage.getItem('role')}/dashboard`} /> : <Authentication page={'Login'} />} />
                    <Route path='/register' render={() => JSON.parse(localStorage.getItem('isLogin')) ? <Redirect to={`/${localStorage.getItem('role')}/dashboard`} /> : <Authentication page={'Register'} />} />
                    {JSON.parse(localStorage.getItem('isLogin')) ? null : <Redirect to='/' />}
                    <Route path={`/${localStorage.getItem('role')}/dashboard`} render={() => <MiniDrawer page={'Dashboard'} />} />
                    <Route path={`/${localStorage.getItem('role')}/usersList`} render={() => <MiniDrawer page={'Users List'} />} />
                    <Route path='/addUser' render={() => <FormPage formType={'Add'} />} />
                    <Route path='/editUser/(\d+)' render={() => <FormPage formType={'Edit'} />} />
                    <Route path='/userDetails/(\d+)' render={() => <Preview />} />
                    <Route path='*' render={() => <ErrorPage redirect={`/${localStorage.getItem('role')}/dashboard`} />} />
                </Switch>
            </BrowserRouter>
        </>
    );
}
export default Router