export class Pagination {
    page: number = 0
    size: number = 10

    getPage() {
        return this.page
    }

    getSize() {
        return this.size
    }

    toString() {
        return {
            page: String(this.page),
            size: String(this.size)
        }
    }
}

export class Authentification {
    username: string
    password: string
}