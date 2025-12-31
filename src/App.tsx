import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import UsersTable from "./components/tables/UsersTable";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import NotAccess from "./pages/OtherPage/NotAccess";
import AdminTable from "./components/tables/AdminsTable";
import ProtectedRouteAdmin from "./components/Route/ProtectedAdmin";
import UserInfo from "./pages/UserInfo";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/not-access" element={<NotAccess />} />
          <Route element={<PublicRoute />}>
            <Route path="/signin" element={<SignIn />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/user/:id" element={<UserInfo />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRouteAdmin>
                    <UserProfiles />
                  </ProtectedRouteAdmin>
                }
              />
              <Route path="/users-table" element={<UsersTable />} />
              <Route path="/admins-table" element={<AdminTable />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
