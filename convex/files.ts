import { ConvexError, v } from 'convex/values'
import {mutation, query} from './_generated/server'


/* 
A mutation is basically an endpoint that can be called fron the client and it going to do some modificaitons such as store entries into the convex database 

Theres another type of endpoint called query that is used to fetch data from the database

Theres a third type of endpoint called action that is used when you need to contact a third party library such as openai or stripe

*/

export const createFile = mutation({
    args: {
        name: v.string(),
        orgId: v.string()
    },
    handler: async (ctx, args) => {
        // if identity is defined then we know that the user is logged in 
        // This allows use to ensure who ever is calling the endpoint is logged in
        const identity = await ctx.auth.getUserIdentity() 

        if (!identity) {
            throw new ConvexError('You must be logged in to create a file')
        }

        await ctx.db.insert('files', {
            name: args.name,
            orgId: args.orgId
        })
    }
})


export const getFiles = query({
    args: {
        orgId: v.string()
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity() 

        if (!identity) {
            return []
        }

        return await ctx.db.query('files').withIndex('by_orgId', q => 
            q.eq('orgId', args.orgId)
        ).collect()
    }
})