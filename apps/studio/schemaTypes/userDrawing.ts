import { IceCreamIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export const userDrawingType = defineType({
  name: 'userDrawing',
  icon: IceCreamIcon,
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
      name: 'userDrawing',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      userName: 'userName',
      userDrawing: 'userDrawing',
      artworkName: 'refArtwork.name',
    },
    prepare(selection) {
      const { userName, userDrawing, artworkName } = selection

      return {
        title: `${userName}'s version of ${artworkName}`,
        media: userDrawing ? userDrawing : null,
      }
    },
  },

});