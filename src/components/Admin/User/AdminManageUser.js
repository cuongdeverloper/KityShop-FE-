import { useEffect, useState } from "react";
import { getUserApi, GetUserPaginateApi, updateUserApi, deleteUserApi, RegisterApi } from "../../../service/ApiService";
import TableUserManager from "./TableUserManager";
import ModalPreviewUser from "./ModalPreviewUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { toast } from "react-toastify";
import ModalAddUser from "./ModalAddUser";

const AdminManageUser = () => {
    const [dataUser, setDataUser] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPreview, setDataPreview] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [showPreviewUser, setShowPreviewUser] = useState(false);
    const [showDeleteUser, setShowDeleteUser] = useState(false);
    const [showHideModalManageUser, setShowHideModalManageUser] = useState(false);

    const handleButtonPreviewUser = (data) => {
        setDataPreview(data);
        setShowPreviewUser(true);
    };

    const handleButtonUpdateUser = (data) => {
        setShowUpdateUser(true);
        setDataUpdate(data);
    };

    const handleButtonDeleteUser = (data) => {
        setShowDeleteUser(true);
        setDataDelete(data);
    };


    const limitUser = 5;
    const fetchListUserWithPagination = async (page) => {
        let res = await GetUserPaginateApi(page, limitUser);
        if (res.errorCode === 0) {
            setDataUser(res.data.users);
            setPageCount(res.data.totalPages);
        }
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            let response = await updateUserApi(
                updatedUser._id,
                updatedUser.name,
                updatedUser.role,
                updatedUser.sex,
                updatedUser.phoneNumber,
                updatedUser.profileImage
            );

            if (response.data.errorCode === 0) {
                toast.success(response.data.message);
                fetchListUserWithPagination(currentPage); // Reload the user list
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user. Please try again.');
        }
    };

    const handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserApi(user._id);
            console.log(response)
            if (response.errorCode === 0) {
                toast.success(response.message);
                fetchListUserWithPagination(currentPage); 
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user. Please try again.');
        }
    };
    const handleOpenAddUser = () =>{
        setShowHideModalManageUser(true);
    }
    const handleAddUser = async (data) => {
        console.log(data); // Log the data to ensure it is being passed correctly
        try {
            // Destructure the necessary fields from the data object
            const { email, password, name, role, sex, phoneNumber, profileImage } = data;
    
            // Call the RegisterApi with all the required parameters
            let response = await RegisterApi(email, password, name, role, sex, phoneNumber, profileImage);
    
            // Check the response and handle accordingly
            if (response.errorCode === 0) {
                toast.success("User added successfully!");
                setShowHideModalManageUser(false);
                fetchListUserWithPagination(currentPage);
            } else {
                // Enhanced error handling
                const errorMessage = response?.message || "An unexpected error occurred.";
                toast.error(errorMessage);
            }
        } catch (error) {
            // Improved error logging for debugging
            console.error("Error adding user:", error.response?.data || error.message);
            toast.error("Failed to add user. Please try again.");
        }
    };
    
    
    
    useEffect(() => {
        fetchListUserWithPagination(currentPage);
    }, [currentPage]);

    return (
        <div className="AdminManageUser-container">
            <div className="div-btn-addNewUser">
                    <button className="btn btn-primary" onClick={() => handleOpenAddUser()}>Add new user</button>
                </div>
            <div className="div-btn-tableUsers">
            <ModalAddUser show={showHideModalManageUser}
                setShow={setShowHideModalManageUser}
                fetchListUserWithPagination={fetchListUserWithPagination}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onAdd = {handleAddUser}
                />
                <TableUserManager
                    listUser={dataUser}
                    pageCount={pageCount}
                    handleButtonUpdateUser={handleButtonUpdateUser}
                    handleButtonPreviewUser={handleButtonPreviewUser}
                    handleButtonDeleteUser={handleButtonDeleteUser}
                    fetchListUserWithPagination={fetchListUserWithPagination}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalPreviewUser
                    show={showPreviewUser}
                    dataPreview={dataPreview}
                    setShow={setShowPreviewUser}
                />
                <ModalUpdateUser
                    show={showUpdateUser}
                    setShow={setShowUpdateUser}
                    dataPreview={dataUpdate}
                    onUpdate={handleUpdateUser}
                />
                <ModalDeleteUser
                    show={showDeleteUser}
                    setShow={setShowDeleteUser}
                    dataDelete={dataDelete}
                    onDelete={handleDeleteUser}
                />
            </div>
        </div>
    );
};

export default AdminManageUser;
