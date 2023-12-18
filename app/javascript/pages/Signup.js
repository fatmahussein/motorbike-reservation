import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../redux/user/userSlice';

function SignUp() {
  const navigate = useNavigate();
  const [dataReg, setDataReg] = useState({
    user: {
      username: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const createUserResponse = useSelector((state) => state.user.createUserMsg.token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createUser(dataReg));
  };
  useEffect(() => {
    if (createUserResponse) {
      navigate('/');
    }
  }, [dispatch, createUserResponse, navigate]);

  const handleUsernameChange = (e) => {
    setDataReg({ ...dataReg, user: { ...dataReg.user, username: e.target.value } });
  };
  const handlePasswordChange = (e) => {
    setDataReg({ ...dataReg, user: { ...dataReg.user, password: e.target.value } });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-cover bg-center" >
        <div className="flex items-center justify-center flex-col gap-6 w-4/5 p-12 md:max-w-fit md:max-h-fit bg-white rounded-md">
          <h1 className="text-gray-800 font-bold text-2xl">
            Welcome to
            <span className="text-[#97BF0F]"> Health Clinic</span>
          </h1>
          <h2 className="text-gray-800 font-bold text-2xl">Sign up</h2>
          <form className="flex items-center justify-center flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
            <input
              required
              id="outlined-basic"
              type="text"
              onChange={(e) => handleUsernameChange(e)}
              label="Username"
              variant="outlined"
            />
            <input
              required
              id="outlined-basics"
              type="password"
              onChange={(e) => handlePasswordChange(e)}
              label="Password"
              variant="outlined"
            />
            <div className="flex gap-4">
             <Link to="/">Log in</Link>
              <button type="submit" variant="outlined">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;