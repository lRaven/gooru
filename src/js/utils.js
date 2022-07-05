import { navBarForManager, navBarForUser, navBarForAdmin } from './uiDataByRoles'
const selectDataByRole = (userRole) => {

	switch (userRole) {
		case 'Manager':
			return navBarForManager
		case 'DefaultUser':
			return navBarForUser;
		case 'AdminCRM':
			return navBarForAdmin;
	}
}
export { selectDataByRole }
