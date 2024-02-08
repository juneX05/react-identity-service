import MainLayout from "../../../layouts/MainLayout.jsx";
import UserProfileDetails from "./components/UserProfileDetails.jsx";
import ChangePassword from "./components/ChangePassword.jsx";

const UserProfile = () => {
    return <MainLayout
        pageHeader="User Profile"
    >
        <div className={"row"}>

            <div className={"col-md-6"}>
                <UserProfileDetails />
            </div>

            <div className={"col-md-6"}>
                <ChangePassword />
            </div>

        </div>




    </MainLayout>
}

export default UserProfile