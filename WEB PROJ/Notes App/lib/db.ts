import mysql from "mysql2/promise"

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "notes_app",
}

// Create a connection pool
const pool = mysql.createPool(dbConfig)

// Mock implementation of Prisma-like API for MySQL
export const db = {
  user: {
    findUnique: async ({ where }: { where: { email: string } }) => {
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [where.email])
      return (rows as any[])[0] || null
    },
    create: async ({ data, select }: { data: any; select?: any }) => {
      const { name, email, password } = data
      const [result] = await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
        name,
        email,
        password,
      ])
      const id = (result as any).insertId

      if (select) {
        const user: any = { id: id.toString() }
        if (select.name) user.name = name
        if (select.email) user.email = email
        return user
      }

      return { id: id.toString(), name, email }
    },
  },
  category: {
    findMany: async ({ where, orderBy }: { where: any; orderBy?: any }) => {
      let query = "SELECT * FROM categories WHERE user_id = ?"
      const params = [where.userId]

      if (orderBy?.name === "asc") {
        query += " ORDER BY name ASC"
      }

      const [rows] = await pool.query(query, params)
      return (rows as any[]).map((row) => ({
        id: row.id.toString(),
        name: row.name,
        userId: row.user_id.toString(),
      }))
    },
    findFirst: async ({ where }: { where: any }) => {
      let query = "SELECT * FROM categories WHERE 1=1"
      const params: any[] = []

      if (where.id) {
        query += " AND id = ?"
        params.push(where.id)
      }

      if (where.userId) {
        query += " AND user_id = ?"
        params.push(where.userId)
      }

      const [rows] = await pool.query(query, params)
      const row = (rows as any[])[0]

      if (!row) return null

      return {
        id: row.id.toString(),
        name: row.name,
        userId: row.user_id.toString(),
      }
    },
    create: async ({ data }: { data: any }) => {
      const { name, userId } = data
      const [result] = await pool.query("INSERT INTO categories (name, user_id) VALUES (?, ?)", [name, userId])
      const id = (result as any).insertId

      return {
        id: id.toString(),
        name,
        userId,
      }
    },
    createMany: async ({ data }: { data: any[] }) => {
      const values = data.map((item) => [item.name, item.userId])
      await pool.query("INSERT INTO categories (name, user_id) VALUES ?", [values])
    },
  },
  note: {
    findMany: async ({ where, orderBy }: { where: any; orderBy?: any }) => {
      let query = "SELECT * FROM notes WHERE user_id = ?"
      const params = [where.userId]

      if (where.categoryId) {
        query += " AND category_id = ?"
        params.push(where.categoryId)
      }

      if (where.OR) {
        const searchConditions = where.OR.map((condition: any) => {
          if (condition.title?.contains) {
            params.push(`%${condition.title.contains}%`)
            return "title LIKE ?"
          }
          if (condition.content?.contains) {
            params.push(`%${condition.content.contains}%`)
            return "content LIKE ?"
          }
          return null
        }).filter(Boolean)

        if (searchConditions.length > 0) {
          query += ` AND (${searchConditions.join(" OR ")})`
        }
      }

      if (orderBy?.updatedAt === "desc") {
        query += " ORDER BY updated_at DESC"
      }

      const [rows] = await pool.query(query, params)
      return (rows as any[]).map((row) => ({
        id: row.id.toString(),
        title: row.title,
        content: row.content,
        categoryId: row.category_id.toString(),
        userId: row.user_id.toString(),
        createdAt: row.created_at.toISOString(),
        updatedAt: row.updated_at.toISOString(),
      }))
    },
    findFirst: async ({ where }: { where: any }) => {
      let query = "SELECT * FROM notes WHERE 1=1"
      const params: any[] = []

      if (where.id) {
        query += " AND id = ?"
        params.push(where.id)
      }

      if (where.userId) {
        query += " AND user_id = ?"
        params.push(where.userId)
      }

      const [rows] = await pool.query(query, params)
      const row = (rows as any[])[0]

      if (!row) return null

      return {
        id: row.id.toString(),
        title: row.title,
        content: row.content,
        categoryId: row.category_id.toString(),
        userId: row.user_id.toString(),
        createdAt: row.created_at.toISOString(),
        updatedAt: row.updated_at.toISOString(),
      }
    },
    create: async ({ data }: { data: any }) => {
      const { title, content, categoryId, userId } = data
      const now = new Date()

      const [result] = await pool.query(
        "INSERT INTO notes (title, content, category_id, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        [title, content, categoryId, userId, now, now],
      )
      const id = (result as any).insertId

      return {
        id: id.toString(),
        title,
        content,
        categoryId,
        userId,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      }
    },
    update: async ({ where, data }: { where: any; data: any }) => {
      const updates: string[] = []
      const params: any[] = []

      if (data.title !== undefined) {
        updates.push("title = ?")
        params.push(data.title)
      }

      if (data.content !== undefined) {
        updates.push("content = ?")
        params.push(data.content)
      }

      if (data.categoryId !== undefined) {
        updates.push("category_id = ?")
        params.push(data.categoryId)
      }

      updates.push("updated_at = ?")
      const now = new Date()
      params.push(now)

      params.push(where.id)

      await pool.query(`UPDATE notes SET ${updates.join(", ")} WHERE id = ?`, params)

      const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [where.id])
      const row = (rows as any[])[0]

      return {
        id: row.id.toString(),
        title: row.title,
        content: row.content,
        categoryId: row.category_id.toString(),
        userId: row.user_id.toString(),
        createdAt: row.created_at.toISOString(),
        updatedAt: row.updated_at.toISOString(),
      }
    },
    delete: async ({ where }: { where: any }) => {
      await pool.query("DELETE FROM notes WHERE id = ?", [where.id])
    },
  },
}
