import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        date: z.date(),
        description:z.string(), 
        image: image().refine((img) => img.width < 1200, {
            message:'por favor que la imagen sea menor a 1200px'
        }),
    
        //referencia autores
        author: reference('author'),

         //relacion
        tags:z.array(z.string()) ,

        // filtrar posts

        isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
        type:'data',
        schema:({ image }) =>
            z.object({
                name: z.string(),
                avatar: image(),           
                twitter: z.string(), 
                linkedIn:  z.string(),
                github:  z.string(),
                bio: z.string(), 
                subtitle: z.string(),
            }), 
    });


export const collections = {
    blog:blogCollection,
    author: authorCollection,
}