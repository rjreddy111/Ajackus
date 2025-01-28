import { Component } from "react";


import {Menu,Search,CircleUserRound} from "lucide-react"
import UserForm from "../UserForm";

import UsersList from "../UsersList"

import "./index.css"

class Home extends Component {

    state = {
        users:[],
        isEditing:false,
        successMessage:"",
        showModal:false, 
        searchText:"",

        form: {
            id:"", 
            firstName:"", 
            lastName:"", 
            email:"", 
            department:""
        }
    }

    componentDidMount(){
        this.getUsers()
    }


    //fetching the users from the link

    getUsers = async()=> {
        try {
            const data = await fetch ("https://jsonplaceholder.typicode.com/users") 
            const response = await data.json()
            const formatedData = response.map((user)=>{
                const [firstName,lastName] = user.name.split(' '); 
                console.log(firstName,lastName)
                console.log(lastName.length)
                return {
                    ...user, firstName,
                    lastName:lastName.length>0 ? lastName : "",
                    email:user.email,
                    department: user.company?.name || ""
                }
            })
            this.setState({users:formatedData})
        }
        catch (error) {
            console.log("Error in fetching", error.message)
        }
    }

    onEditUser = (id) => {
        const { users } = this.state;
        const selectedUser = users.find((user) => user.id === id);
        if (selectedUser) {
          const { firstName, lastName, email, department } = selectedUser;
          this.setState({
            form: {
              id, 
              firstName,
              lastName,
              email,
              department,
            },
            isEditing: true,
            showModal:true 
          });
        }
      };

    navigateToForm = ()=> {
        this.setState({showModal:true , isEditing:false,
            form: {
                id:"", firstName:"", lastName:"", email:"", department:"",successMessage:""
            }
        })

    }

 //handling deleteing of user

    handleDeleteUser = async(id)=> {
        const {users} = this.state 
        try {
            const response = await fetch (`https://jsonplaceholder.typicode.com/users/${id}`, {
                method:"DELETE"
            }); 
            if (!response.ok) throw new Error ("Failed To Delete User")
            this.setState ({
        users: users.filter((user)=> user.id!==id), 
        successMessage:"Selected User has been deleted successfully"
    } , 
    ()=> {
        setTimeout(()=> {
            this.setState({successMessage:""})
        },2000)
    }
) 



        }
        catch (error) {
            console.log("Error in deleting User", error.message) 
        }
        
    }

    onChangeSearch = (event)=> {
        this.setState({searchText:event.target.value})

    }

    handleFormSubmit =async(form,isEditing)=> {
        this.setState({ successMessage: "" })
        if (isEditing) {
            this.handleEditUser(form)
        }
        else {
            this.handleAddUser(form)
        }

    }

 //Hadnling editing User//
    handleEditUser = async(form) => {
        const {users} = this.state 
        try {
        const {id,firstName,lastName,email,department} = form 
        console.log("clicked",id)
        console.log("Request Body:", {
            name: `${firstName} ${lastName}`,
            email,
            company: { name: department },
          });
          console.log(`url https://jsonplaceholder.typicode.com/users/${id} `)
        const response = await  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method:"PUT", 
            headers : {
                'Content-Type' :"application/json",
            }, 
            body:JSON.stringify ({
                name :`${firstName} ${lastName}`, 
                email, 
                company: {
                    name : department
                },
            })
        }); 
        console.log("Response Status:", response.status);
        if (!response.ok) throw new Error ("Unable to update User")
       
            const updatedData = users.map((eachUser)=> (
                eachUser.id===id ? {
                ...eachUser,firstName ,lastName,email,department } : eachUser ));
                this.setState({users: updatedData, isEditing:false, showModal:false , successMessage:"User details has been updated"  })

        }
        catch (error) {
            console.log("Error in updating", error.message)
        }
    }


    handleAddUser = async(form)=> {
        try {
            const {firstName,lastName,email,department} = form 
           
            const response = await fetch ("https://jsonplaceholder.typicode.com/users", {
                method:"POST", 
                headers: {
                    'Content-Type' : "application/json",
                }, 
                body:JSON.stringify({
                    name: `${firstName} ${lastName}`, 
                    email, 
                    company: {
                        name:department,
                    },
                }),

            }); 
            if (!response.ok)  throw new Error ('failed to add user') ; 
            const data  = await response.json()
         
            this.setState({
                users: [...this.state.users, {
                    ...data,
                    
                    firstName,lastName,email,department
                }], 
                isEditing: false,
                showModal:false , 
                successMessage: "User added successfully!",
            
            } 
            

        
        )
            
        }
        catch(error) {
            console.log(error.message)

        }
    }

    onCloseModal = ()=> {
        
        this.setState({showModal:false,successMessage:""})
    }

    render(){

        const {users,form,isEditing,showModal,searchText,successMessage} = this.state 
        console.log(isEditing)
        console.log(users)

        const filteredData = users.filter((user)=> user.firstName.toLowerCase().includes(searchText.toLocaleLowerCase()))

        return (
            <div className="main-dashboard-bg">
                <div className="header-bg-container">
                    <h2 className="dashbiard"> <Menu className="menu-controler" />Dashboard</h2> 
                    <div className="search-container">
                        <input type = "search" className="input-style" onChange={this.onChangeSearch} value ={searchText} placeholder="Search by First Name" /> 
                        <Search/>
                    </div> 
                    <button className="add-user-button" onClick={this.navigateToForm}>Add User</button>
                    <p className="user-profile"><CircleUserRound/></p>

                </div>

                {successMessage && (
                <div className="message-success"> {successMessage} </div>
            )}

                <div className="table-background">
                    <table className="table-show">
                        <thead>
                            <tr>
                                <th className="id-class">ID</th>
                                <th className="firs-name">First Name</th>
                                <th className="firs-name">Last Name</th>
                                <th className="email">Email</th>
                                <th className="department">Department</th>
                                <th className="actions " colSpan={2}>Actions</th>
                            </tr>
                        </thead>

                        {/*data passing to UserList */}
                        <tbody>
                            {filteredData.map((eachUser)=> (
                                <UsersList key = {eachUser.id} details = {eachUser} form={form} onEditedUser ={this.onEditUser} 
                                onDeleteUser={this.handleDeleteUser} />
                            ))}
                        </tbody>
                    </table> 

                    {/*Based on condition am showing modal */}
                    {showModal? ( 
                        <div className="modal-layout">
                            <div className="modal-content">
                        
                        <UserForm form= {form} isEditing={isEditing} onSubmit={this.handleFormSubmit} 
                    onCloseModal = {this.onCloseModal} 
                    onChange = {(e)=>this.setState({form:{...form, [e.target.name]:e.target.value}})}
                    />
                    </div>
                    </div>
                    
                    ) : ""}
                   
                </div>

            </div>
        )
    }
}



export default Home