module.exports = class Space {
    constructor(title, instructions, top, left) {
        if (title.length == 0) {
            throw new Error('Must have a title')
        }

        if (instructions.length == 0) {
            throw new Error('Must have instructions')
        }

        this.title = title
        this.instructions = instructions
        this.top = top
        this.left = left
    }
}