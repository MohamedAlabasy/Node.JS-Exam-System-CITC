
const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

import mongoose from 'mongoose'
import User from '../../models/userSchema';

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin',
    branding: {
        favicon: 'https://media-exp2.licdn.com/dms/image/C4E03AQGff53_8W8prA/profile-displayphoto-shrink_800_800/0/1616316754399?e=1661990400&v=beta&t=AiP8xcN_tynyvSNQxq9jua-lNdjN7GtfdvKAiHlIguQ',
        logo: 'https://media-exp2.licdn.com/dms/image/C4E03AQGff53_8W8prA/profile-displayphoto-shrink_800_800/0/1616316754399?e=1661990400&v=beta&t=AiP8xcN_tynyvSNQxq9jua-lNdjN7GtfdvKAiHlIguQ',
        companyName: 'CITC',
        softwareBrothers: false,
    },

    resources: [{
        resource: User,
        options: {
            parent: {
                name: 'user data',
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
    email: process.env.ADMIN_EMAIL || 'admin2@admin.com',
    password: process.env.ADMIN_PASSWORD || '123456',
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'ADMIN_COOKIE_NAME',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'ADMIN_COOKIE_PASS',
    authenticate: async (email: string, password: string) => {
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN
        }
        return null
    }
})

export default router