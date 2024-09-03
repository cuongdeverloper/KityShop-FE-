export const Fetch_User_Success = 'fetch user success';
export const Fetch_User_LogOut = 'fetch user logOut';

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
