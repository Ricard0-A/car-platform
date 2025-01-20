const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: null,
			currentSeller: null,
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

			

			registerSellers: async (sellers) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/register/sellers`, {
						method: "POST",
						body: sellers
					})
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
					if (response.status==200) {
						setStore({
							currentSeller: data.seller
						
						})
						localStorage.setItem("token", data.token)
					}
					return response.status
				} catch (error) {
					console.log(error)
					return false
				}

			},

			addCar: async (cars) => {
				try {
			
					const response = await fetch(`${process.env.BACKEND_URL}/seller/cars`,{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
							
						},
						body: JSON.stringify(cars)
					})
					const data = await response.json()
					
					if (response.ok) {
						setStore({
							cars: data.car
						})
					} else
					
						return response.status

				} catch (error) {
					console.log(error)
					return false || 500
				}
			},
			getCar: async (cars) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/seller/cars`, {

						method: "GET",
						"Authorization": `Bearer ${localStorage.getItem("token")}`,
					})

					const data = await response.json()
					if (response.ok) {
						setStore({
							cars: data.cars
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


		},
	}
};
	export default getState;