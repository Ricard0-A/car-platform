const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,
			token_seller: localStorage.getItem("token_seller") || null,
			currentUser: localStorage.getItem("currentUser") || null,
			currentSeller: localStorage.getItem("currentSeller") || null,
			image: "",
			cars: [],
			favorites: []
		},
		actions: {
			loadAllCars: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/cars`);
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || `Error ${response.status}`);
					}
					const data = await response.json();
					setStore({ cars: data });
					// Verifica si tenemos todos los autos en mi pagina
					const cars = getStore().cars;
					console.log("Absolutamente todos los autos de mi pagina en base de datos son: ", cars);

				} catch (error) {
					console.error("Error loading all cars:", error);
				}
			},

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
					// console.log(user);
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
						localStorage.setItem("currentUser", JSON.stringify(data.user));
					}
					return response.status;
				} catch (error) {
					console.log(error);
					return false;
				}
			},

			logOut: () => {
				setStore({
					token: null,
					currentUser: null
				})
				localStorage.removeItem("token")
				localStorage.removeItem("currentUser")

			},

			addFavorite: async (carId) => {
				try {
					const token = localStorage.getItem("token"); // Always localStorage

					if (!token) {
						console.error("No token found in localStorage");
						return false;
					}
					const user = JSON.parse(localStorage.getItem("currentUser"));
					if (!user) {
						console.error("No user found in localStorage");
						return false;
					}
					const store = getStore();
					const isFavorite = store.favorites.some(fav => fav.car_id === carId);

					if (isFavorite) {
						return await getActions().deleteFavorite(carId);
					} else {
						const response = await fetch(`${process.env.BACKEND_URL}/favorites`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								"Authorization": `Bearer ${localStorage.getItem("token")}`
							},
							body: JSON.stringify({ car_id: carId })
						});

						if (!response.ok) {
							const errorData = await response.json();
							console.error("Error adding favorite:", errorData);
							return response.status;
						}

						const favorite = await response.json();

						const store = getStore();
						const updatedFavorites = [...store.favorites, favorite];
						setStore({ ...store, favorites: updatedFavorites });

						console.log("Favoritos actualizados:", updatedFavorites);
						return true;
					}
				} catch (error) {
					console.error("Error adding favorite:", error);
					return false;
				}
			},


			deleteFavorite: async (carId) => {
				try {
					const token = localStorage.getItem("token");
					if (!token) {
						console.error("No token found in localStorage");
						return false;
					}

					const response = await fetch(`${process.env.BACKEND_URL}/favorites`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${localStorage.getItem("token")}`
						},
						body: JSON.stringify({ car_id: carId })
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error deleting favorite:", errorData);
						return response.status;
					}

					const store = getStore();
					const updatedFavorites = store.favorites.filter(fav => fav.car_id !== carId);
					setStore({ ...store, favorites: updatedFavorites });

					console.log("Favorito Eliminado, Actualizando Favoritos...:", updatedFavorites);

					return true;

				} catch (error) {
					console.error("Error deleting favorite:", error);
					return false;
				}
			},

			loadFavorites: async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) {
						console.error("No token found in localStorage");
						return []; // Devuelve un array vacío si no hay token
					}
					const user = JSON.parse(localStorage.getItem("currentUser"));
					if (!user) {
						console.error("No user found in localStorage");
						return []; // Devuelve un array vacío si no hay usuario
					}
					const response = await fetch(`${process.env.BACKEND_URL}/favorites/${user.id}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${localStorage.getItem("token")}`
						},
					});
					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error loading favorites:", errorData);
						return []; // Devuelve un array vacío en caso de error REAL en la petición
					}
					const favoritesAdd = await response.json();
					//  Aquí está la clave:
					if (Array.isArray(favoritesAdd)) { // Verifica si es un array antes de hacer algo.
						console.log("Favoritos recibidos del backend:", favoritesAdd);
						setStore({ favorites: favoritesAdd })
						return favoritesAdd;
					} else {
						console.error("Respuesta inesperada del backend:", favoritesAdd);
						return []; // Devuelve un array vacío si la respuesta no es un array.
					}
				} catch (error) {
					console.error("Error loading favorites:", error);
					return []; // Devuelve un array vacío en caso de error en el try...catch
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
							token_seller: data.token_seller,
							currentSeller: data.seller

						})
						localStorage.setItem("token_seller", data.token_seller)
						localStorage.setItem("currentSeller", data.seller)
						getActions().getCar();  // Solo si me logeo reviso Mis autos
					}
					return response.status
				} catch (error) {
					console.log(error)
					return false
				}

			},
			logOutSeller: () => {
				setStore({
					token_seller: null,
					currentSeller: null
				})
				localStorage.removeItem("token_seller")
				localStorage.removeItem("currentSeller")
			},
			addCar: async (car) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/seller/cars`, {
						method: "POST",
						headers: {
							"Authorization": `Bearer ${localStorage.getItem("token_seller")}`,
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
							"Authorization": `Bearer ${localStorage.getItem("token_seller")}`
						}

					})
					const data = await response.json()
					if (response.ok) {
						console.log(data)
						setStore({
							cars: data
						})
						// Solo para verificar los elementos de cars 
						const cars = getStore().cars;
						console.log("Mis autos son: ", cars);
						return true || 200


					} else {
						return false || 400
					}
				} catch (error) {
					console.log(error)
					return false || 500
				}
			},

			editCar: async (update, idCar) => {
				try {
					console.log("Este es el update", update)
					console.log("El car id es", idCar)
					const formData = new FormData()
					for (let item in update) {
						formData.append(item, update[item])
					}
					const response = await fetch(`${process.env.BACKEND_URL}/seller/cars/${idCar}`, {

						method: "PUT",
						headers: {
							// Este es de christopher
							"Authorization": `Bearer ${localStorage.getItem("token")}`
							// Este es de ricardo
							// "Content-Type": "application/json",
							// "Authorization": `Bearer ${localStorage.getItem("token_seller")}`
						},
						body: formData
					})

					const data = await response.json()
					if (response.ok) {
						const store = getStore()
						getActions().getCar()
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
							"Authorization": `Bearer ${localStorage.getItem("token_seller")}`
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

			sendEmail: async (email) => {
				console.log(email)
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/send-email`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email: email })
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