import axios from '../../api/axios';
import React, { useState,useEffect } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Get_Department_URL = '/dep/getdep';
const GET_Subject_URL = '/sub/getsubject';

function EditSubject() {
    
  const param = useParams();
  const id = param.id;
 const { auth } = useAuth();

  const [subject, setSubject] = useState("");
  const [subjectss, setSubjectss] = useState([]);
  const [task, setTask] = useState([]);
  const [pending, setPending] = useState([]);
  const [reject, setReject] = useState([]);
  const navigate = useNavigate();
  const [rdepartment,setRDepartment] = useState([])
  const depart = param.department;
  const [department, setDepartment] = useState(depart);

  useEffect(() => {
    const getOne= async () =>{
      try {
        const {accessToken } = auth;

        const res = await axios.get(`/sub/getonesubject/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
    
     
          setDepartment(res.data.department);
          setSubject(res.data.subject);   

      } catch (err) {
        toast.error(err);
      }
    }

    getOne();
  }, [auth,id]);

  useEffect(() => {
    const getSubs = async () => {
      try {
        const { accessToken } = auth;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        };
        const res = await axios.get(GET_Subject_URL, config);
        setSubjectss(res.data);
      } catch (err) {
        
        toast.error('Error occurred while fetching subjects.');
      }
    };
  
    getSubs();
  }, [auth]);

  useEffect(() => {
    const getDeps = async () => {
      try {
        const { accessToken } = auth;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        };
        const res = await axios.get(Get_Department_URL, config);
        setRDepartment(res.data);
      } catch (err) {
       
        toast.error('Error occurred while fetching departments.');
      }
    };
  
    getDeps();
  }, [auth]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (subject == "") {
      toast.warn("Please fill the subject", {
        autoClose: 5000, // Display for 3 seconds
      });
      return;
    }
    if (department == "") {
      toast.warn("Please select the department", {
        autoClose: 5000, // Display for 3 seconds
      });
      return;
    }

    try {
        const { accessToken } = auth;
        const isDuplicateID = subjectss.some((emp) => emp.subject === subject && emp._id !== id);

        if (isDuplicateID) {
          toast.error("Subject Name is already used.");
          return;
        }

        await axios.put(
        `/sub/addtask/${id}`,
        JSON.stringify({  department,subject,task,pending,reject }),
        {
          headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
          withCredentials: true,
        }
      );
      toast.success("Updated successfully", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(`/admin/showSub/${id}`);
      }, 1500);
    } catch (error) {
      
      alert("Failed to update");
    }
  };


  
  const handleTaskChange = (index, event) => {
    const newTask = [...task];
    newTask[index][event.target.name] = event.target.value;
    setTask(newTask);
  };

  const handleAddTask = () => {
    setTask([
      ...task,
      { name: ""}
    ]);
  };

  const handleRemoveTask = (index) => {
    const newTask = [...task];
    newTask.splice(index, 1);
    setTask(newTask);
  };

const handlePendChange = (index, event) => {
    const newPend = [...pending];
    newPend[index][event.target.name] = event.target.value;
    setPending(newPend);
  };

  const handleAddPend = () => {
    setPending([
      ...pending,
      { name: ""}
    ]);
  };

  const handleRemovePend = (index) => {
    const newPend = [...pending];
    newPend.splice(index, 1);
    setPending(newPend);
  };


  const handleRejectChange = (index, event) => {
    const newReject = [...reject];
    newReject[index][event.target.name] = event.target.value;
    setReject(newReject);
  };

  const handleAddReject = () => {
    setReject([
      ...reject,
      { name: ""}
    ]);
  };

  const handleRemoveReject = (index) => {
    const newReject = [...reject];
    newReject.splice(index, 1);
    setReject(newReject);
  };

  

  
  return (
    <>
    <div className="flex justify-center items-center  h-full w-full bg-white pt-5">
        <div className="w-2/3 bg-white rounded-xl border-black border-4  shadow-xl p-8 m-4 ml-64 mt-24">
       
          <h1 className="block w-full text-center text-black text-3xl font-bold mb-6">
            Edit Subject
          </h1>

          <form method="post" className="grid grid-cols-2 gap-1">
    <div className="flex flex-col mb-4 mr-4 pt-8">
  <label className="mb-2 font-bold text-lg text-black ml-5" htmlFor="subject">Subject ID</label>
  <input
   className="border py-2 px-3 text-grey-800 w-full rounded-xl shadow-md"
   required
                type="text"
                placeholder="Subject Name"
                name="subject"
                id="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </div>


            <div className="flex flex-col mb-4 mr-5 pt-8">
              <label className="mb-2 font-bold text-lg text-black ml-5" for="name"> Department
          </label>
          <select
  id="department"
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
  className="border py-2 px-3 text-grey-800 w-full rounded-xl shadow-md"
>
{rdepartment.map((dept) => (
    <option key={dept.id} value={dept.name}>
      {dept.name}
    </option>
  ))}
</select>

              
              
            
            </div>
          

            {task.map((task, index) => (
            <div key={index} className="flex flex-col">
            <div className="flex flex-col mb-4 mr-5">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="mb-2 font-bold text-lg text-black ml-5"
                >
                  Task :
                </label>
                <input
                  type="text"
                  name="name"
                  value={task.name}
                  onChange={(event) => handleTaskChange(index, event)}
                  className="border py-2 px-3 text-grey-800 w-full rounded-xl shadow-md"
                  placeholder="Enter task"
                />
              </div>
              </div>
                <div className="flex flex-row items-center justify-center mt-4 ">
                    <button
                onClick={() => handleRemoveTask(index)}
                className="bg-red-600 rounded-[8px] mt-[-20px] w-[80px] mr-[370px] hover:bg-red-800 text-white font-bold shadow focus:outline-none focus:shadow-outline"
                    >
                Remove
              </button>
            </div>
            </div>
          ))}

         

          {pending.map((pending, index) => (
             <div key={index} className="flex flex-col">
             <div className="flex flex-col mb-4 mr-5">
               <div className="flex flex-col">
                 <label
                   htmlFor="name"
                   className="mb-2 font-bold text-lg text-black ml-5"
                 >
                  Pending Reason :
                </label>
                <input
                  type="text"
                  name="name"
                  value={pending.name}
                  onChange={(event) => handlePendChange(index, event)}
                  className="border py-2 px-3 text-grey-800 w-full rounded-xl shadow-md"
                  placeholder="Enter Pending reason"
                />
              </div>
              </div>
                <div className="flex flex-row items-center justify-center mt-4 ">
                    <button
                onClick={() => handleRemovePend(index)}
                className="bg-red-600 rounded-[8px] mt-[-20px] w-[80px] mr-[370px] hover:bg-red-800 text-white font-bold shadow focus:outline-none focus:shadow-outline"
                    >
                Remove
              </button>
            </div>
            </div>
          ))}

         

          {reject.map((reject, index) => (
          <div key={index} className="flex flex-col">
          <div className="flex flex-col mb-4 mr-5">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-2 font-bold text-lg text-black ml-5"
              >
                  Rejected Reason :
                </label>
                <input
                  type="text"
                  name="name"
                  value={reject.name}
                  onChange={(event) => handleRejectChange(index, event)}
                  className="border py-2 px-3 text-grey-800 w-full rounded-xl shadow-md"
                  placeholder="Enter Reject reason"
                />
              </div>
              
              </div>
                <div className="flex flex-row items-center justify-center mt-4 ">
                    <button
                onClick={() => handleRemoveReject(index)}
                className="bg-red-600 rounded-[8px] mt-[-20px] w-[80px] mr-[370px] hover:bg-red-800 text-white font-bold shadow focus:outline-none focus:shadow-outline"
                >
                Remove
              </button>
            </div>
            </div>
          ))}



<div className="col-span-2 flex justify-center">
            <button
              type="button"
              onClick={handleAddTask}
              className="bg-green-600 rounded-[10px] h-8 w-32 m-auto hover:bg-green-700 text-white font-bold py-2 px-4 shadow focus:outline-none focus:shadow-outline"
              >
              ADD TASK
            </button>
         
            <button
              type="button"
              onClick={handleAddPend}
              className="bg-green-600 rounded-[10px] h-8 w-40 m-auto hover:bg-green-700 text-white font-bold py-2 px-4 shadow focus:outline-none focus:shadow-outline"
              >
              ADD PENDING
            </button>
          </div>

          <div className="col-span-2 flex justify-center">
            <button
              type="button"
              onClick={handleAddReject}
              className="bg-green-600 rounded-[10px] h-8 w-32 m-auto hover:bg-green-700 text-white font-bold py-2 px-4 shadow focus:outline-none focus:shadow-outline"
              >
              ADD REJECT
            </button>
           
          </div>



          <div className="col-span-2 flex justify-center">
            <button
                className="bg-amber-800 rounded-[10px] mt-5 h-10 w-[200px] m-auto hover:bg-amber-900 text-white font-bold py-2 px-4 shadow focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    
    
    
    </>
 )
}

export default EditSubject;
