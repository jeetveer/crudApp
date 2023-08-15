import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';


function Home() {

    const [getuserdata, setUserdata] = useState([]);

    
    const getdata = async () => {

        const res = await fetch('/getdata', {
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
    }, [])



    ///////////////////////////////////////////////////////////



    const deleteuser = async (id) => {

        const res2 = await fetch(`/deletuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            getdata();
        }

    }






    return (
        <>
            <div className='mt-5'>
                <div className="container">
                    <div className="add_btn">
                        <NavLink to="/register" className="btn btn-primary mb-2">Add Data</NavLink>
                    </div>

                    <table className="table">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">id</th>
                                <th scope="col">Username</th>
                                <th scope="col">email</th>
                                <th scope="col">job</th>
                                <th scope="col">Number</th>
                                <th scope="col">Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{getuserdata[id].work}</td>
                                                <td>{getuserdata[id].mobile}</td>
                                                <td className='d-flex justify-content-between'>
                                                    <NavLink to={`view/${element._id}`}><button className='btn btn-success'><VisibilityIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element._id}`} className='btn btn-primary' ><EditIcon /></NavLink>
                                                    <button className='btn btn-danger' onClick={() => deleteuser(element._id)}><DeleteIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }


                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default Home