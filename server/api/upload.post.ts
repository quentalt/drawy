import { writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)
  if (!files?.length) {
    throw createError({
      statusCode: 400,
      message: 'No file provided'
    })
  }

  const file = files[0]
  const extension = file.filename.split('.').pop()
  const fileName = `${randomUUID()}.${extension}`
  const filePath = join('public', 'uploads', fileName)

  await writeFile(filePath, file.data)

  return {
    url: `/uploads/${fileName}`
  }
})