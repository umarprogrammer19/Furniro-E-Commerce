import { type SchemaTypeDefinition } from 'sanity'
import { product } from './productSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
}
