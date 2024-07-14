export type CategoryType = { 
    name: string,
    id: number
}

export type TaskType = {
    name: string,
    description?: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    status: boolean
    category?: Array<number>,
    id?: number,
}