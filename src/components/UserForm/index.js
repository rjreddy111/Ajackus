

import "./index.css"

const UserForm = (props)=> {
    const {form,isEditing,onSubmit, onChange,onCloseModal} = props 

    const handleForm = (e)=> {
        e.preventDefault() ;
        onSubmit (form,isEditing)

    }

    

return (
    <form  className="Modal-information" onSubmit={handleForm} >
        {isEditing ? (<h3>Edit Details</h3>): (<h3>Add New User</h3>)}
        <div className="user-container-input">
            <label htmlFor="firtname">First Name : </label>
            <input className="user-input-area" type = "text" placeholder="First Name" id = "firtname" name = "firstName" value = {form.firstName}      onChange={onChange} require/> 
            
        </div>
        <div className="user-container-input">
            <label htmlFor="lastname">Last Name : </label>
            <input className="user-input-area" type ="text" placeholder="Last Name"  id = "lastname" name = "lastName" value = {form.lastName}      onChange={onChange}  required/> 
            
        </div>
        <div className="user-container-input">
            <label htmlFor="emailId">Email : </label>
            <input className="user-input-area" type ="email" id="emailId" placeholder="email" name ="email" value ={form.email}      onChange={onChange} required/>
        </div>
        <div className="user-container-input">
            <label htmlFor="departmentId">Department :</label>
            <input className="user-input-area" type ="text" id = "departmentId" placeholder="Department" name ="department" value = {form.department}      onChange={onChange} required/>
        </div>
        <button className="button-add-update"
           type = "submit"
          >{isEditing? "Update" : "Add"}
          </button> 
       
        <button className="button-cancel" onClick={()=> onCloseModal()}>Cancel</button>


    </form>


)

}


/*
    componentDidMount(){
        this.getPostDetails()
    }

    getPostDetails = async()=> {

    }

    submitForm = async(event)=> {

    }

    render(){
        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <input type = "text" placeholder="First Name" name = "firstName"/> 
                    <br/>
                    <input type ="text" placeholder="Last Name"  name = "lastName" /> 
                    <br/>
                    <input type ="email" placeholder="email" name ="email" /> 
                    <br/>
                    <input type ="text" placeholder="Department" name ="department"/>
                    <br/>
                    <br/>
                    <button type ="submit">Add User</button>

                </form>
            </div>
        )
    }
}

*/
export default UserForm