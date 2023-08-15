import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Register() {

    const navigate = useNavigate("");

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    })


    const setdata = (e) => {
        const { name, value } = e.target;
        setINP({ ...inpval, [name]: value });
        console.log("Regis---", inpval);
    };


    const addinpdata = async (e) => {
        e.preventDefault();
        // const {name,email,age,mobile,work,add,desc} = inpval;

        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inpval)
            // body:JSON.stringify({ name,email,age,mobile,work,add,desc }) 
        });


        const data = await res.json();

        if (res.status === 404 || !data) {
            alert("error");
        } else {
            alert("data added");
            navigate('/');
        }
    }



    return (
        <>
            <div className="container">
                <NavLink to="/">Home</NavLink>
                <form className='mt-5'>
                    <div className="row ">
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                            <input type="text" value={inpval.name} name='name' onChange={setdata} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                            <input type="email" value={inpval.email} name='email' onChange={setdata} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="exampleInputPassword1" className="form-label">Age</label>
                            <input type="text" value={inpval.age} name='age' onChange={setdata} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="exampleInputPassword1" className="form-label">Mobile</label>
                            <input type="number" value={inpval.mobile} name='mobile' onChange={setdata} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="exampleInputPassword1" className="form-label">Work</label>
                            <input type="text" value={inpval.work} name='work' onChange={setdata} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                            <input type="text" value={inpval.address} name='add' onChange={setdata} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-12 col-md-12 col-12">
                            <label htmlFor="floatingTextarea2">Comments</label>
                            <textarea className="form-control" value={inpval.desc} name='desc' onChange={setdata} placeholder="Leave a comment here" id="floatingTextarea2" rows="5"></textarea>
                        </div>
                        <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default Register