// import store from '@/store'
import { navBarForManager, navBarForUser } from './uiDataByRoles'
const selectDataByRole = (userRole) => {

    switch(userRole) {
      case 'Manager': 
          return navBarForManager
      case 'DefaultUser':
          return navBarForUser;
    }
}

export { selectDataByRole }
