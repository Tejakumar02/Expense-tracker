import React, { useState } from "react";
import axios from 'axios';
import { isValidPassword, validatePassword, isNotNull } from "../helpers/common";
import ToastModal from "../components/ToastModal/ToastModal";

const Settings = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toast, setToast] = useState(false);
    const [toastType, setToastType] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const userName = sessionStorage.getItem('name');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!handleSave()) {
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_APPLICATION_URL}/api/overview/change_password`, { userName, oldPassword, newPassword });

            if (response.status === 200) {
                setToast(true);
                setToastType('success');
                setToastMessage(response.data.msg);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        }
        catch(err) {
            if(err.response && err.response.status === 400) {
                setToast(true);
                setToastType('error');
                setToastMessage(err.response.data.msg);
            }
            else {
                setToast(true);
                setToastType('error');
                setToastMessage("Network Error");
            }
        }
    }

    const handleSave = () => {
        let valid = true;
        const isValid = isNotNull(oldPassword);
        const validPassword = isValidPassword(newPassword);
        const paswordMismatch = validatePassword(newPassword, confirmPassword);

        if(isValid) {
            setToast(true);
            setToastType('error');
            setToastMessage('Old Password is required');
            valid = false;
            return;
        }

        if (validPassword) {
            setToast(true);
            setToastType('error');
            setToastMessage('Password should have atleast 8 characters');
            setNewPassword('');
            setConfirmPassword('');
            valid = false;
            return;
        }
        if (paswordMismatch) {
          setToast(true);
          setToastType('error');
          setToastMessage('Password mismatch, enter same passwords in both fields');
          setConfirmPassword('');
          valid = false;
          return;
        }
        return valid;
      }

    return (
        <>
            <div className="settings">
                <div className="change-password">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Enter old Password</label>
                            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                        </div>
                        <div>
                            <label>Enter new Password</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div>
                            <label>Confirm  Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                            {toast && <ToastModal message={toastMessage} hideModal={() => setToast(false)} type={toastType} />}
                            <button onClick={handleSave}>Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Settings;