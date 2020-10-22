import apiURL from "./api"

// const storageService = new StorageService()

// const customePost = async (url: string, dataForm: any): Promise<ResponseModel> => {

//     const token = storageService.get(Constant.auths.token)
//     try {
//         const res = await axios({
//             url: url,
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             data: dataForm
//         })

//         const response: ResponseModel = {
//             isSuccess: true,
//             data: res.data
//         }
//         ToastCustomSuccess(response.data.message)
//         return response
//     } catch (error) {

//         const response: ResponseModel = {
//             isSuccess: false,
//             data: null
//         }
//         ToastCustomWarning("Vui lòng thử lại")
//         return response
//     }
// }

// const customeGet = async (url: string): Promise<ResponseModel> => {

//     const token = storageService.get(Constant.auths.token)
//     try {
        
//         const res = await axios({
//             url: url,
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             }
//         })

//         const response: ResponseModel = {
//             isSuccess: true,
//             data: res.data
//         }
        
//         ToastCustomSuccess(response.data.message)
//         return response
//     } catch (error) {

//         const response: ResponseModel = {
//             isSuccess: false,
//             data: null
//         }
        
//         ToastCustomWarning("Vui lòng thử lại")
//         return response
//     }
// }
// const orderApi = async (data: BookingModel): Promise<ResponseModel> => {
//     const result = await customePost(url.order, data)
//     const tickets: Array<TicketModel> = data.seats.map((e, index) => {
//         return {
//             ...e,
//             code: result.data.ticketCodes[index],
//             movie:data.movie,
//             date:data.date,
//             hall:data.hall
//         }
//     })
//     const dataStore: ListTicketModel = {
//         ...data,
//         tickets
//     }

//     storageService.set(Constant.bookingData.isData, true)
//     storageService.set(Constant.bookingData.data, dataStore)
//     return result
// }
const Signin = async (resquest:any) => {
    const { user } = resquest
    const requestOption = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }
    try {
        const response = await fetch(apiURL.signin, requestOption)
        const data = await response.json()

        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            localStorage.setItem('auth', 'true')
            localStorage.setItem('accessToken', data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            return data.message
        }
    } catch (error) {
        throw error
    }

}

const Signup = async (resquest:any) => {
    const { user } = resquest
    const requestOption = {
        method: 'POST',
        body: user
    }

    try {
        const response = await fetch(apiURL.signup, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data.message
            return response
        }
    } catch (error) {
        throw error
    }
}


export {
    Signin,
    Signup
}