import rss from '@astrojs/rss';


import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const blogPosts = await getCollection('blog');

export const GET: APIRoute = ({ params, request, site }) => {
  
        

    return rss({
        // stylesheet:'/styles/rss.xsl',
        // `<title>` field in output xml
        title: 'Rodwin Blog',
        // `<description>` field in output xml
        description: 'Mi blog con Astro',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        site: site ?? '',
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: blogPosts.map(({data, slug}) =>({
            title: data.title,
            pubDate:data.date,
            description:data.description,
            link:`posts/${slug}`
        })),
        // (optional) inject custom xml
        customData: `<language>es-es</language>`,
      });


}