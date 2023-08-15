import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import profileUser from "../img/user.png";


function Details() {

    // eslint-disable-next-line
    const [getuserdata, setUserdata] = useState([]);

    const { id } = useParams("");
    
    const navigate = useNavigate();


    const getdata = async () => {

        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });


        const data = await res.json();
        console.log(data);

        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            setUserdata(data)
            console.log("get added");
        }
    }

    useEffect(() => {
        getdata();
        // eslint-disable-next-line
    }, [id])


    ////////////////////////////////////////////////////////////


    const deleteuser = async (id) => {

        const res2 = await fetch(`/deletuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            alert("user deleted");
            navigate('/');
        }

    }

    
    
    
    


    return (
        <>
            <div className="container mt-3">
                <h1 style={{ fontWeight: 400 }}>Welcome Jeet Veer</h1>

                <Card sx={{ maxWidth: 600 }}>
                    <CardContent>
                        <div className="add_btn">
                            <NavLink to={`/edit/${getuserdata._id}`}><button className='btn btn-primary mx-2' ><EditIcon /></button></NavLink>
                            <button className='btn btn-danger' onClick={() => deleteuser(getuserdata._id)} ><DeleteIcon /></button>
                        </div>
                        <div className="row">

                            <div className="left_view col-lg-6 col-md-6 col-12">
                                <img className='ms-5' src={profileUser} style={{ width: 60 }} alt="profile" />
                                <h3 className='mt-3'>Name: <span >{getuserdata.name}</span></h3>
                                <h3 className='mt-3'>Age: <span >{getuserdata.age}</span></h3>
                                <p className='mt-3'><MailIcon />Email: <span>{getuserdata.email}</span></p>
                            </div>
                            <div className="right_view col-lg-6 col-md-6 col-12">
                                <p className='mt-3'><WorkIcon />Occuption: <span>{getuserdata.work}</span></p>
                                <p className='mt-3'><TabletAndroidIcon />mobile: <span>{getuserdata.mobile}</span></p>
                                <p className='mt-3'><LocationOnIcon />location: <span>{getuserdata.add}</span></p>
                                <p className='mt-3'><LocationOnIcon />Description: <span>{getuserdata.desc}</span></p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Details