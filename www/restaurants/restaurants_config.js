angular.module('restaurants.config', [])
.constant('restaurants_config', {
	static_img_path: "http://162.243.48.9:1337/static/img/restaurants/",
	dummy_restaurant: {
			id: 0,
			name: "Restaurant",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			img: ""
		}
});