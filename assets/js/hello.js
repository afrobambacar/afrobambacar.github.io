class Routes {
    constructor() {
        this.root = ''
        this.routes = this.root + ''
    }
    get() {
        return this.routes
    }
    add(page, slug) {
        this.routes = [this.get(), page, slug].join('/')
        return this
    }
    contentOwners(slug) {
        
    }
}