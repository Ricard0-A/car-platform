const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
	
		},
		actions: {
			register: async (user) =>{
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/register`, {
						method: "POST",
						body: user
					})
					return response.status

				} catch (error) {
					console.log(error)
					return response.status
				}
			},

			login: async (user) => {
				try {
					console.log(user)
					const response = await fetch(`${process.env.BACKEND_URL}/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(user)
					})

					const data = await response.json()
					if (response.ok) {
						setStore({
							currentUser: data.user
						})

						localStorage.setItem("token", data.token)
						
					}
					return response.status
				} catch (error) {
					console.log(error)
					return false
				}


			},

			// registerSellers:async(sellers)=>{
			// 	try {
			// 		const response = await fetch(`${process.env.BACKEND_URL}/register/sellers`,{
			// 			method:"POST", 
			// 			body:sellers
			// 		})	
			// 		return response.status
			// 	} catch (error) {
			// 		console.log(error)
			// 		return response.status
			// 	}
			// },

			// loginSellers:async(sellers)=>{

			// }
		}
	};
};

export default getState;
