export const Fetch_User_Success = 'fetch user success';
export const Fetch_User_LogOut = 'fetch user logOut';
export const Fetch_User_Success_Google = 'FETCH_USER_SUCCESS_GOOGLE';

export const doLogin = (response) => {
    const { id, access_token, email, refresh_token, name, profileImage, role, phoneNumber, sex } = response.data;
    return {
        type: Fetch_User_Success,
        payload: {
            id,
            access_token,
            email,
            refresh_token,
            name,
            profileImage,
            role,
            phoneNumber,
            gender: sex
        }
    }
}

export const doLogout = () => {
    return {
        type: Fetch_User_LogOut,
    }
}
export const doLoginWGoogle = (response, access_token, refresh_token) => {
    return {
        type: Fetch_User_Success_Google,
        payload: {
            id: response?._id || '',
            access_token: access_token || '',
            email: response?.email || '',
            refresh_token: refresh_token || '',
            username: response?.username || '',
            role: response?.role || '',
            phoneNumber: response?.phoneNumber || '',
            gender: response?.gender || '',
            image:response?.image || ''
        }
    };
};