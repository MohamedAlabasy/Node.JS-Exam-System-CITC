
const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

import mongoose from 'mongoose'
import User from '../../models/userSchema';


AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin',
    branding: {
        logo: 'https://media-exp1.licdn.com/dms/image/C4E03AQGff53_8W8prA/profile-displayphoto-shrink_200_200/0/1616316754399?e=1657152000&v=beta&t=0HQqUUI7EPruiOYvJEBX1KcJ_YH9OKS-NIMWdiBWKpc',
        companyName: 'CITC',
    },
    resources: [{
        resource: User,

        options: {
            parent: {
                name: 'Admin Accepts',
                icon: 'fas fa-cogs',
            },
            properties: {
                token: {
                    isVisible: false,
                },
                updatedAt: {
                    isVisible: {
                        list: true, edit: false, filter: true, show: true,
                    },
                },
                createdAt: {
                    isVisible: {
                        list: true, edit: false, filter: true, show: true,
                    },
                }
            }
        }
    }]
})


const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin@admin.com',
    password: process.env.ADMIN_PASSWORD || '123',
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
    authenticate: async (email: any, password: any) => {
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN
        }
        return null
    }
})

export default router