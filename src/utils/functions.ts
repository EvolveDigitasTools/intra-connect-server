export const isUser = (assignee: string): boolean => {
    if (assignee.includes('@'))
        return true
    return false
}