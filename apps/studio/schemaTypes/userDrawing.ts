import { ImageIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export const userDrawingType = defineType({
  name: 'userDrawing',
  icon: ImageIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'userName',
      title: 'User\'s name',
      type: 'string',
    }),
    defineField({
      name: 'refArtwork',
      type: 'reference',
      to: [{ type: 'artwork' }],
    }),
    defineField({
      name: 'userName',
      title: 'User\'s name',
      type: 'string',
    }),
  ],
});