import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const SignupForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function changeHandler(event) {

        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))

    }

    const submitHandler = async (event) => {
        event.preventDefault();
        // if(formData.password !== formData.confirmPassword) {
        //     toast.error("Passwords do not match");
        //     return ;
        // }

        const accountData = {
            ...formData
        };

        console.log("printing Final account data ");
        console.log(accountData);

        let res = await fetch("http://localhost:8614/api/v3/user/new", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(accountData)
        })

        
        let resJson = await res.json();
        console.log(resJson)

        if (res.status === 200) {
            console.log("resData", resJson)
            toast.success("Account Created");
            setIsLoggedIn(true);
            window.localStorage.setItem("email", accountData.email);
            navigate("/dashboard");
        }
        else {
            console.log("resData", resJson)
        }



    }


    return (
        <div>

            <form onSubmit={submitHandler} >
                {/* first name and lastName */}
                <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.375rem] text-white'>First Name<sup className='text-red-500'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.375rem] text-white'>Last Name<sup className='text-red-500'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
                </div>
                {/* email Add */}
                <div className='mt-[20px]'>
                    <label className='w-full mt-[20px]'>
                        <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.375rem] text-white'>Email Address<sup className='text-red-500'>*</sup></p>
                        <input
                            required
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            placeholder="Enter Email Address "
                            value={formData.email}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
                </div>


                {/* createPassword and Confirm Password */}
                <div className='w-full flex gap-x-4 mt-[20px]'>
                    <label className='w-full relative'>
                        <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.375rem] text-white'>Create Password<sup className='text-red-500'>*</sup></p>
                        <input
                            required
                            type={showPassword ? ("text") : ("password")}
                            name="password"
                            onChange={changeHandler}
                            placeholder="Enter Password"
                            value={formData.password}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                        <span
                            className='absolute right-3 top-[38px] cursor-pointer'
                            onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ?

                                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :

                                (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                        </span>
                    </label>

                    {/* <label className='w-full relative'>
                    <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.375rem] text-white'>Confirm Password<sup className='text-red-500'>*</sup></p>
                    <input
                        required
                        type= {showConfirmPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                    <span 
                     className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ?

                         (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                         (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label> */}
                </div>
                <button className=' w-full bg-red-400 text-white hover:bg-red-600 hover:border-red-400 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                    Create Account
                </button>
            </form>

        </div>
    )
}

export default SignupForm
