import {Pencil,Trash2} from "lucide-react"

import "./index.css"


const UsersList = (props)=> {
    const {details,onEditedUser,onDeleteUser} = props 
    const {firstName,lastName,email,department,id} = details

    const editForm = ()=> {
        onEditedUser(id)
        console.log(id)

    }

    const deleteUser = ()=> {
        onDeleteUser(id)

    }


    return (
        <tr>
            <td className="id-class">{id}</td>
            <td className="firs-name">{firstName}</td>
            <td className="firs-name">{lastName}</td>
            <td className="email">{email}</td>
            <td className="department">{department}</td>
            <td >
                <button className="edit-button" onClick={editForm}>Edit</button>
            </td>
            <td>
                <button className="button-delete" onClick={deleteUser}>Delete</button>
            </td>
            <td >
                <button className="edit-button-small" onClick={editForm}><Pencil size ={15}/></button>
            </td>
            <td>
                <button className="button-delete-small" onClick={deleteUser}><Trash2 size = {15}/></button>
            </td>
        </tr>
    )
}


export default UsersList