interface Profiles {
  name: string,
  roles: Roles[]
  active: boolean
}

interface Roles {
  name: string
  roles: Permissions[]
}

interface Permissions {
  id: string
  code: string
}

export const mapAllProfiles = (data: Profiles[]) => {
  return (
    (data &&
      data.length > 0 &&
      data.map((item: any) => {
        const roles = item && item['roles'].length > 0 ? item['roles'].map((role: Roles) => {
          if (role.name === 'Orçamento') {
            const budget_write = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'budget_write')
            const budget_read = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'budget_read')

            if (budget_write && budget_read) {
              return { code: 'budget', action: 'Editar/Visualizar' }
            } else if (budget_read) {
              return { code: 'budget', action: 'Visualizar' }
            } else if (budget_write) {
              return { code: 'budget', action: 'Editar' }
            } else {
              return { code: 'budget', action: 'Sem acesso' }
            }
          } else if (role.name === 'Clientes') {
            const customer_write = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'customer_write')
            const customer_read = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'customer_read')

            if (customer_write && customer_read) {
              return { code: 'clients', action: 'Editar/Visualizar' }
            } else if (customer_read) {
              return { code: 'clients', action: 'Visualizar' }
            } else if (customer_write) {
              return { code: 'clients', action: 'Editar' }
            } else {
              return { code: 'clients', action: 'Sem acesso' }
            }
          } else if (role.name === 'Administrativo') {
            const admin_write = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'admin_write')
            const admin_read = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'admin_read')

            if (admin_write && admin_read) {
              return { code: 'admin', action: 'Editar/Visualizar' }
            } else if (admin_read) {
              return { code: 'admin', action: 'Visualizar' }
            } else if (admin_write) {
              return { code: 'admin', action: 'Editar' }
            } else {
              return { code: 'admin', action: 'Sem acesso' }
            }
          } else if (role.name === 'Usuários') {
            const users_write = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'users_write')
            const users_read = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'users_read')

            if (users_write && users_read) {
              return { code: 'users', action: 'Editar/Visualizar' }
            } else if (users_read) {
              return { code: 'users', action: 'Visualizar' }
            } else if (users_write) {
              return { code: 'users', action: 'Editar' }
            } else {
              return { code: 'users', action: 'Sem acesso' }
            }
          } else if (role.name === 'Financeiro') {
            const financial_write = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'financial_write')
            const financial_read = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'financial_read')

            if (financial_write && financial_read) {
              return { code: 'financial', action: 'Editar/Visualizar' }
            } else if (financial_read) {
              return { code: 'financial', action: 'Visualizar' }
            } else if (financial_write) {
              return { code: 'financial', action: 'Editar' }
            } else {
              return { code: 'financial', action: 'Sem acesso' }
            }
          } else if (role.name === 'Log') {
            const log_write = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'log_write')
            const log_read = role.roles.find((mappedItem: Permissions) => mappedItem.code === 'log_read')

            if (log_write && log_read) {
              return { code: 'log', action: 'Editar/Visualizar' }
            } else if (log_read) {
              return { code: 'log', action: 'Visualizar' }
            } else if (log_write) {
              return { code: 'log', action: 'Editar' }
            } else {
              return { code: 'log', action: 'Sem acesso' }
            }
          }

        }) : []

        return {
          name: item['name'],
          budget: roles && roles.find((item: any) => item.code === 'budget') || { code: 'budget', action: 'Sem acesso' },
          clients: roles.find((item: any) => item.code === 'clients') || { code: 'clients', action: 'Sem acesso' },
          admin: roles.find((item: any) => item.code === 'admin') || { code: 'admin', action: 'Sem acesso' },
          users: roles.find((item: any) => item.code === 'users') || { code: 'users', action: 'Sem acesso' },
          financial: roles.find((item: any) => item.code === 'financial') || { code: 'financial', action: 'Sem acesso' },
          log: roles.find((item: any) => item.code === 'log') || { code: 'log', action: 'Sem acesso' },
          active: item['active']
        }
      })) ||
    []
  )
}