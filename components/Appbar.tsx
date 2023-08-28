import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { isUserLoading } from "../store/selectors/isUserLoading";
import {useSetRecoilState, useRecoilValue} from "recoil";
import { userEmailState } from "../store/selectors/userEmail"
import { useRouter } from "next/router";
import { userState } from "@/store/atoms/user";
import { Loading } from "./Loading";
import { useEffect } from "react";
import { NEXT_URL } from "@/config";
import axios from "axios";

function Appbar({}) {
    const router = useRouter()
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);


    useEffect(() => {
        //console.log("token - " + localStorage.getItem("token"));
        initMe();
    }, []);

    async function initMe(){
        const response = await axios.get(`${NEXT_URL}/api/auth/me`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (response.data.username) {
            setUser(response.data.username)
        }
    }

    if (userLoading) {
        return <Loading />
    }

    if (userEmail) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                router.push("/")
            }}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10, display: "flex"}}>
                <div style={{marginRight: 10}}>
                        <Button
                            onClick={() => {
                                router.push("/addCourse")
                            }}
                        >Add course</Button>
                    </div>

                    <div style={{marginRight: 10}}>
                        <Button
                            onClick={() => {
                                router.push("/courses")
                            }}
                        >Courses</Button>
                    </div>

                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", "");
                            setUser({
                                isLoading: false,
                                userEmail: null
                            })
                            router.push("/");
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    } else {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                router.push("/")
            }}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10}}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            router.push("/signup")
                        }}
                    >Signup</Button>
                </div>
                <div>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            router.push("/signin")
                        }}
                    >Signin</Button>
                </div>
            </div>
        </div>
    }
}

export default Appbar;