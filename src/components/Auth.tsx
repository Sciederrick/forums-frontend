/* eslint-disable @typescript-eslint/no-explicit-any */
import TextField from "@mui/material/TextField";
import Logo from "./../assets/logo-1.png";
import Button from "@mui/material/Button";
import client from "../lib/feathersClient";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

const Auth = () => {
    useEffect(() => {
        const reAuthenticate = async () => {
            try {
                const token = localStorage.getItem("feathers-jwt");
                console.log("🚀 ~ reAuthenticate ~ token:", token);
                if (token) {
                    // Authenticate using an existing token
                    await client.reAuthenticate();
                    ctx?.onSetShowAuth(false);
                }
            } catch (err: any) {
                ctx?.onNotif(`Reauthentication failed with: ${err}`);
            }
        };
        reAuthenticate();
    });
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const ctx = useContext(AppContext);
    const loginWithEmailPwd = async (e?: any) => {
        try {
            e?.preventDefault();
            const response = await client.authenticate({
                strategy: "local",
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem("feathers-jwt", response.accessToken);
            ctx?.onSetShowAuth(false);
        } catch (err: any) {
            ctx?.onNotif(`Login failed with: ${err}`);
        }
    };

    const signup = async (e: any) => {
        try {
            e.preventDefault();
            await client.service("users").create({
                email: formData.email,
                password: formData.password,
            });

            await loginWithEmailPwd();
        } catch (err: any) {
            ctx?.onNotif(`Signup failed with: ${err}`);
        }
    };

    const loginWithGithub = async (e: any) => {
        try {
            e.preventDefault();
            // Add logic to login with Github
        } catch (err: any) {
            ctx?.onNotif(`Login with Github failed with: ${err}`);
        }
    };

    return (
        <form className="p-8 flex flex-col gap-8 md:max-w-xl md:mx-auto">
            <img src={Logo} width={150} height={150} className="mx-auto my-8" />
            <TextField
                onChange={handleChange}
                id="email"
                name="email"
                label="email"
                variant="outlined"
                fullWidth
            />
            <TextField
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                label="password"
                variant="outlined"
                fullWidth
            />
            <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                onClick={(e) => loginWithEmailPwd(e)}
            >
                LOGIN
            </Button>
            <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                onClick={(e) => signup(e)}
            >
                SIGNUP
            </Button>
            <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                onClick={(e) => loginWithGithub(e)}
                disabled
            >
                LOGIN WITH GITHUB
            </Button>
        </form>
    );
};

export default Auth;
