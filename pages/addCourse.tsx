import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {useState} from "react";
import { useRouter } from 'next/router'
import { NEXT_URL } from "@/config";
import axios from "axios";

function AddCourse() {
    //const navigate = useNavigate();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    return <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant="outlined" style={{width: 400, padding: 20}} >
        <TextField
            onChange={(e) => {
                setTitle(e.target.value)
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
        />

        <TextField
            onChange={(e) => {
                setDescription(e.target.value)
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
        />

        <TextField
            onChange={(e) => {
                setImage(e.target.value)
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
        />


        <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
                const res = await axios.post(`${NEXT_URL}/api/admin/addCourse`, {
                    title: title,
                    description: description,
                    imageLink: image,
                    published: true
                }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                const data = res.data;

                console.log("Course addded by" + data);
                router.push("/courses");
            }}
        > Add course</Button>
        </Card>
    </div>
}

export default AddCourse;