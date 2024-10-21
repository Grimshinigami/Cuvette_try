import {createSlice} from '@reduxjs/toolkit'

interface User{
    fields:{
        name:String,
        phone:String,
        companyname:String,
        companyemail:String,
        employeesize:String
    }
}

const initialState:User = {
    fields: {
        name:"",
        phone:"",
        companyname:"",
        companyemail:"",
        employeesize:""
    }
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        addFields: (state,action)=>{
            state.fields.name = action.payload.name
            state.fields.phone = action.payload.phone
            state.fields.companyname = action.payload.companyname
            state.fields.companyemail = action.payload.companyemail
            state.fields.employeesize = action.payload.employeesize
        },
    }
})

export const {addFields} = userSlice.actions

export default userSlice.reducer