const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,
			currentUser: localStorage.getItem("currentUser") || null,
			currentSeller: localStorage.getItem("currentUser") || null,
			image: "",
			cars: []
		},
		actions: {
			register: async (user) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/register`, {
						method: "POST",
						body: user
					})
					return response.status
				} catch (error) {
					console.log(error)
					return false
				}
			},

			login: async (user) => {
				try {
					console.log(user);
					const response = await fetch(`${process.env.BACKEND_URL}/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(user),
					});

					const data = await response.json();
					if (response.ok) {
						setStore({
							token: data.token,
							currentUser: data.user,
						});

						localStorage.setItem("token", data.token);
						localStorage.setItem("currentUser", data.user)
					}
					return response.status;
				} catch (error) {
					console.log(error);
					return false;
				}
			},

			registerSellers: async (sellers) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/register/sellers`, {
						method: "POST",
						body: sellers
					})
					console.log(response)
					console.log(response.status)
					return response.status
					
				} catch (error) {
					console.log(error)
					return response.status
				}
			},

			loginSellers: async (sellers) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/login/sellers`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(sellers)
					})
					const data = await response.json()
					console.log(response)
					if (response.status == 200) {

						setStore({
							token: data.token,
							currentSeller: data.seller

						})
						localStorage.setItem("token", data.token)
						localStorage.setItem("currentUser", data.seller)
					}
					return response.status
				} catch (error) {
					console.log(error)
					return false
				}

			},
			logOutSeller: () => {
				setStore({
					token: null,
					currentSeller: null
				})
				localStorage.removeItem("token")
				localStorage.removeItem("currentSeller")
			},
			addCar: async (car) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/seller/cars`, {
						method: "POST",
						headers: {
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
						},
						body: car
					})
					const data = await response.json()

					if (response.ok) {
						setStore({
							...getStore(),
							cars: data.car
						})
						return response.status
					} else

						return response.status

				} catch (error) {
					console.log(error)
					return false || 500
				}
			},

			getCar: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/seller/cars`, {

						method: "GET",
						headers: {
							"Authorization": `Bearer ${localStorage.getItem("token")}`
						}

					})
					const data = await response.json()
					if (response.ok) {
						console.log(data)
						setStore({
							cars: data
						})
						return true || 200
					} else {
						return false || 400
					}
				} catch (error) {
					console.log(error)
					return false || 500
				}
			},

			editCar: async (cars, update) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/seller/cars/<int:theid>`, {

						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${localStorage.getItem("token")}`
						},
						body: JSON.stringify(update)
					})

					const data = await response.json()
					if (response.ok) {
						const store = getStore()
						const edited = store.cars.map(cars => cars.id === cars_id ? { ...cars, ...update } : cars)

						setStore({ cars: edited })
						return true || 200
					} else {
						return false || 400

					}

				} catch (error) {
					console.log(error)
					return false || 500
				}


			},

			deleteCar: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/seller/cars/${id}`, {

						method: "DELETE",
						headers: {
							"Authorization": `Bearer ${localStorage.getItem("token")}`
						},
					})
					if (response.ok) {
						getActions().getCar()
						alert("Car delete")
					} else {
						return ("Failed to delete the car")
					}

				} catch (error) {
					console.log(error)
				}


			},

			addCarImage: async (payload) => {
				try {

					const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`, {
						method: "POST",
						body: payload
					})
					const data = await response.json()
					return data.secure_url

				} catch (error) {
					console.log(error)
					return false || 500
				}
			},

			sendEmail:async(email)=>{
				console.log(email)
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/send-email`,{
						method:"POST",
						headers:{
							"Content-Type":"application/json",	
						},
						body: JSON.stringify({email:email})
					})	

					console.log(response)
				} catch (error) {
					console.log(error)	
				}
			}
		},
	}
};
export default getState;